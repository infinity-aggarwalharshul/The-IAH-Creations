# The IAH Creations

An independent web project by Harshul Aggarwal. The static app provides
problem-solving project starters, an AI project builder, an optional voice
chat, example project concepts, and Firebase-backed account features when
their services and rules are configured.

Generated code and example concepts are starting points. Review, configure,
and test them before production use.

## What is implemented

- Website, web app, mobile app, and browser-game project generation through a
  configured authenticated server-side agent.
- A chat workflow using LangGraph, a Gemini text-generation model, intent
  routing, and bounded text extraction from PDF, DOCX, TXT, Markdown, and CSV
  attachments.
- Optional browser speech recognition and speech playback. The hands-free
  Voice Bridge is turn-based; it is not Gemini Live or a real-time audio
  streaming integration.
- Firebase Authentication, Firestore chat/contact records, and private
  Firebase Storage chat attachments when configured. Users can view, download,
  and delete their uploaded files in the chat.
- Firebase Storage and Firestore security rules in `storage.rules` and
  `firestore.rules`.
- A service worker that caches the public app shell and static assets and
  checks for updates. New site code must first be built and deployed; this does
  not update the backend, dependencies, Firebase services, or model catalog.

## AI model support

The browser selector and server allowlist include these Google text-generation
models, subject to API access and provider availability:

- Gemini 4 Carbon, Gemini 4 Argon, Gemini 4 Hydrogen
- Gemini 3.8 Flash, Gemini 3.6 Flash, Gemini 3.5 Flash-Lite

The allowlist is intentionally limited to models tested through the current
`ChatGoogleGenerativeAI` text-generation path. Live audio, speech, embedding,
image, video, and other model APIs are not wired into that path. NLP intent
routing is performed by the chat agent; this project does not ship a separate
trained NLP model. Model catalogs change: verify the official [Google Gemini
model documentation](https://ai.google.dev/gemini-api/docs/models) and update
both `index.html` and `server/agent/main.py` before enabling a new model.

## Firebase file storage

The browser configuration names the Firebase project
`the-iah-creationgit-1741-47b3f` and bucket
`the-iah-creationgit-1741-47b3f.firebasestorage.app`. This identifies the
intended project; it does not prove that the bucket is provisioned or enabled.
In [Firebase Console](https://console.firebase.google.com/project/the-iah-creationgit-1741-47b3f/overview),
check **Authentication → Sign-in method**, **Firestore Database**, and
**Storage**. Apply the rules before enabling uploads:

```sh
firebase deploy --only firestore:rules,storage --project the-iah-creationgit-1741-47b3f
```

Uploaded objects are stored beneath
`users/{uid}/chat_uploads/`. The rules restrict access to the verified owner.
The AI service also needs `FIREBASE_STORAGE_BUCKET` and a least-privileged
service account with access to read those objects.

Firebase web configuration is public client configuration, not a server
secret. Keep the Gemini API key and service-account credentials on the server,
never in `index.html` or `config.js`.

## Local checks and static build

```sh
sh scripts/build-pages.sh
python -m unittest discover -s server/agent -p 'test_main.py'
```

The Python tests require the packages in `server/agent/requirements.txt`.
The generated `dist/` directory is ignored by Git.

Set `window.IAH_CONFIG.agentApiUrl` in `config.js` to the authenticated agent
service URL to enable chat and project generation. See
[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for Firebase and server setup.

## Hosting and updates

The repository is currently configured for GitHub Pages from `main` at
`https://infinity-aggarwalharshul.github.io/The-IAH-Creations/`. A successful
push to `main` automatically publishes the repository root. The service
worker checks the deployed site for changes on page visits and periodically
while open; it asks before reloading if it detects unsaved work.

Cloudflare Pages is not configured in this repository. To host there, connect
the repository in the Cloudflare dashboard, set the build command to
`sh scripts/build-pages.sh`, and set the output directory to `dist`. A Git
push will deploy to Cloudflare only after that integration is configured.

## Legal and licensing

The source code is offered under the [MIT License](./LICENSE). Read
[COPYRIGHT](./COPYRIGHT), [TRADEMARK](./TRADEMARK), and
[LEGAL_GUIDE.md](./LEGAL_GUIDE.md) for factual project notices. No company,
trademark, copyright registration, or patent filing is claimed by this
repository. The legal notes are informational, not legal advice.

Contact: <theiahcreations@gmail.com>
