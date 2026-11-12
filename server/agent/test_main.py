import unittest
from unittest.mock import patch

from fastapi.testclient import TestClient
from langchain_core.messages import AIMessage

from main import AgentIntent, app, extract_document_text, require_verified_user, validate_file_paths


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


class DocumentExtractionTests(unittest.TestCase):
    def test_extracts_plain_text_and_caps_extracted_content(self):
        self.assertEqual(extract_document_text("notes.txt", b"Business requirements"), "Business requirements")

    def test_rejects_unsupported_document_types(self):
        with self.assertRaises(ValueError):
            extract_document_text("payload.exe", b"not a document")


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

    def test_builder_returns_generated_text_from_the_server_model(self):
        app.dependency_overrides[require_verified_user] = lambda: {"uid": "user-123"}

        class FakeModel:
            def with_structured_output(self, schema):
                return self

            def invoke(self, messages):
                return {"files": [{"path": "index.html", "content": "<main>Ready</main>"}]}

        with (
            patch("main.get_model", return_value=FakeModel()),
            patch("main.enforce_rate_limit"),
            patch("main.enforce_generation_limit"),
        ):
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


if __name__ == "__main__":
    unittest.main()
