import base64
import json
import unittest
from unittest.mock import patch

from fastapi.testclient import TestClient
from langchain_core.messages import AIMessage

from main import (
    ALLOWED_GENERATION_MODELS,
    AgentIntent,
    GenerateRequest,
    app,
    extract_document_text,
    generate_with_interactions,
    read_generation_attachments,
    require_verified_user,
    validate_file_paths,
)


class ValidateFilePathsTests(unittest.TestCase):
    def test_accepts_files_from_the_authenticated_user_upload_folder(self):
        validate_file_paths("user-123", ["users/user-123/chat_uploads/brief.pdf"])

    def test_rejects_another_users_file(self):
        with self.assertRaises(ValueError):
            validate_file_paths("user-123", ["users/user-456/chat_uploads/brief.pdf"])

    def test_rejects_traversal_and_unsupported_types(self):
        with self.assertRaises(ValueError):
            validate_file_paths("user-123", ["users/user-123/chat_uploads/../private.pdf"])
        with self.assertRaises(ValueError):
            validate_file_paths("user-123", ["users/user-123/chat_uploads/archive.zip"])

    def test_chat_file_validation_does_not_allow_media_uploads(self):
        with self.assertRaises(ValueError):
            validate_file_paths("user-123", ["users/user-123/chat_uploads/reference.png"])


class DocumentExtractionTests(unittest.TestCase):
    def test_extracts_plain_text_and_caps_extracted_content(self):
        self.assertEqual(extract_document_text("notes.txt", b"Business requirements"), "Business requirements")

    def test_rejects_unsupported_document_types(self):
        with self.assertRaises(ValueError):
            extract_document_text("payload.exe", b"not a document")


class GenerationAttachmentTests(unittest.TestCase):
    def test_reads_owner_scoped_image_as_provider_inline_data(self):
        image_bytes = b"small-image-fixture"

        class FakeBlob:
            size = len(image_bytes)

            def reload(self):
                return None

            def download_as_bytes(self):
                return image_bytes

        class FakeBucket:
            def blob(self, path):
                self.path = path
                return FakeBlob()

        with (
            patch.dict("os.environ", {"FIREBASE_STORAGE_BUCKET": "test-bucket"}),
            patch("main.get_firebase_app", return_value=object()),
            patch("main.firebase_storage.bucket", return_value=FakeBucket()),
        ):
            parts = read_generation_attachments(
                "user-123",
                ["users/user-123/chat_uploads/design.png"],
            )

        self.assertIn("Attached image reference", parts[0]["text"])
        self.assertEqual(parts[1]["type"], "image")
        self.assertEqual(parts[1]["mime_type"], "image/png")
        self.assertEqual(
            base64.b64decode(parts[1]["data"]),
            image_bytes,
        )

    def test_sends_multimodal_payload_to_the_selected_interaction_model(self):
        class FakeResponse:
            def __enter__(self):
                return self

            def __exit__(self, *_):
                return False

            def read(self):
                return json.dumps({
                    "status": "completed",
                    "steps": [{
                        "type": "model_output",
                        "content": [{"type": "text", "text": '{"files":[]}'}],
                    }],
                }).encode()

        request = GenerateRequest(
            prompt="Create a starter",
            model="gemini-4-carbon",
            response_mime_type="application/json",
            response_schema={"type": "object", "properties": {"files": {"type": "array"}}},
        )
        with (
            patch.dict("os.environ", {"GEMINI_API_KEY": "test-key"}),
            patch("main.urllib.request.urlopen", return_value=FakeResponse()) as urlopen,
        ):
            response = generate_with_interactions(
                request,
                [
                    {"type": "text", "text": "Reference notes"},
                    {"type": "image", "mime_type": "image/png", "data": "aW1hZ2U="},
                ],
                "Treat attachments as reference data.",
            )

        http_request = urlopen.call_args.args[0]
        payload = json.loads(http_request.data)
        self.assertEqual(response, '{"files":[]}')
        self.assertTrue(http_request.full_url.endswith("/v1beta/interactions"))
        self.assertEqual(payload["model"], "gemini-4-carbon")
        self.assertFalse(payload["store"])
        self.assertEqual(payload["input"][1], {"type": "text", "text": "Reference notes"})
        self.assertEqual(payload["input"][2], {
            "type": "image",
            "mime_type": "image/png",
            "data": "aW1hZ2U=",
        })
        self.assertEqual(payload["system_instruction"], "Treat attachments as reference data.")
        self.assertEqual(payload["generation_config"]["max_output_tokens"], request.max_output_tokens)
        self.assertEqual(payload["response_format"]["mime_type"], "application/json")
        self.assertEqual(payload["response_format"]["schema"], request.response_schema)

    def test_sends_text_only_generation_through_interactions_api(self):
        class FakeResponse:
            def __enter__(self):
                return self

            def __exit__(self, *_):
                return False

            def read(self):
                return json.dumps({
                    "status": "completed",
                    "steps": [{
                        "type": "model_output",
                        "content": [{"type": "text", "text": "Generated project"}],
                    }],
                }).encode()

        request = GenerateRequest(
            prompt="Create a starter",
            history=[{"role": "user", "text": "I prefer a blue theme."}],
        )
        with (
            patch.dict("os.environ", {"GEMINI_API_KEY": "test-key"}),
            patch("main.urllib.request.urlopen", return_value=FakeResponse()) as urlopen,
        ):
            response = generate_with_interactions(
                request,
                [],
                "You are a project generation assistant.",
            )

        payload = json.loads(urlopen.call_args.args[0].data)
        self.assertEqual(response, "Generated project")
        self.assertEqual(payload["input"][0]["text"], "Create a starter")
        self.assertIn("User: I prefer a blue theme.", payload["input"][1]["text"])
        self.assertFalse(payload["store"])


class AgentApiTests(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def tearDown(self):
        app.dependency_overrides.clear()

    def test_chat_requires_a_firebase_id_token(self):
        response = self.client.post("/chat", json={"prompt": "Help me plan a launch"})
        self.assertEqual(response.status_code, 401)

    def test_chat_rejects_files_owned_by_another_user(self):
        app.dependency_overrides[require_verified_user] = lambda: {"uid": "user-123"}
        with patch("main.enforce_rate_limit"):
            response = self.client.post(
                "/chat",
                json={
                    "prompt": "Summarize this",
                    "files": ["users/user-456/chat_uploads/brief.pdf"],
                },
            )
        self.assertEqual(response.status_code, 400)

    def test_chat_runs_the_langgraph_workflow_for_a_verified_user(self):
        app.dependency_overrides[require_verified_user] = lambda: {"uid": "user-123"}

        class FakeModel:
            def with_structured_output(self, schema):
                class FakeClassifier:
                    def invoke(self, messages):
                        return AgentIntent(category="technical")

                return FakeClassifier()

            def invoke(self, messages):
                return AIMessage(content="Use validation, safe defaults, and focused tests.")

        with patch("main.get_model", return_value=FakeModel()), patch("main.enforce_rate_limit"):
            response = self.client.post(
                "/chat",
                headers={"Authorization": "Bearer test-token"},
                json={"prompt": "How do I build a secure web app?"},
            )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {
            "answer": "Use validation, safe defaults, and focused tests.",
            "intent": "technical",
        })

    def test_builder_returns_generated_text_from_interactions_api(self):
        app.dependency_overrides[require_verified_user] = lambda: {"uid": "user-123"}
        interaction_response = {
            "status": "completed",
            "steps": [{
                "type": "model_output",
                "content": [{
                    "type": "text",
                    "text": '{"files":[{"path":"index.html","content":"<main>Ready</main>"}]}',
                }],
            }],
        }
        with (
            patch.dict("os.environ", {"GEMINI_API_KEY": "test-key"}),
            patch("main.urllib.request.urlopen") as urlopen,
            patch("main.enforce_rate_limit"),
            patch("main.enforce_generation_limit"),
        ):
            class FakeResponse:
                def __enter__(self):
                    return self

                def __exit__(self, *_):
                    return False

                def read(self):
                    return json.dumps(interaction_response).encode()

            urlopen.return_value = FakeResponse()
            response = self.client.post(
                "/generate",
                headers={"Authorization": "Bearer test-token"},
                json={
                    "prompt": "Return JSON project files",
                    "model": "gemini-4-carbon",
                    "response_mime_type": "application/json",
                    "response_schema": {
                        "type": "object",
                        "properties": {"files": {"type": "array"}},
                    },
                },
            )
        self.assertEqual(response.status_code, 200)
        self.assertIn('"index.html"', response.json()["text"])
        payload = json.loads(urlopen.call_args.args[0].data)
        self.assertEqual(payload["model"], "gemini-4-carbon")
        self.assertFalse(payload["store"])

    def test_builder_rejects_another_users_attachment_before_storage_access(self):
        app.dependency_overrides[require_verified_user] = lambda: {"uid": "user-123"}
        with (
            patch("main.enforce_rate_limit"),
            patch("main.enforce_generation_limit"),
            patch("main.firebase_storage.bucket") as bucket,
        ):
            response = self.client.post(
                "/generate",
                headers={"Authorization": "Bearer test-token"},
                json={
                    "prompt": "Create a starter",
                    "files": ["users/user-456/chat_uploads/reference.png"],
                },
            )
        self.assertEqual(response.status_code, 400)
        bucket.assert_not_called()

    def test_builder_accepts_supported_current_models_and_rejects_unlisted_models(self):
        self.assertIn("gemini-4-hydrogen", ALLOWED_GENERATION_MODELS)
        self.assertIn("gemini-3.1-flash-lite", ALLOWED_GENERATION_MODELS)
        app.dependency_overrides[require_verified_user] = lambda: {"uid": "user-123"}
        response = self.client.post(
            "/generate",
            headers={"Authorization": "Bearer test-token"},
            json={"prompt": "Create a starter", "model": "unlisted-model"},
        )
        self.assertEqual(response.status_code, 400)


if __name__ == "__main__":
    unittest.main()
