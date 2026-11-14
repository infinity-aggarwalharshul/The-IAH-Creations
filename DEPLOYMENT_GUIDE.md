# Deployment and service setup

This site has a static frontend and an optional authenticated AI service. A
successful static-site deployment does not provision Firebase, deploy the AI
service, or enable payment providers.

## 1. Build the static site

```sh
sh scripts/build-pages.sh
```

The output is `dist/`. The build includes `sw.js` for app-shell caching and
site-update checks.

## 2. Configure Firebase

The default browser configuration targets project
`the-iah-creationgit-1741-47b3f` and bucket
`the-iah-creationgit-1741-47b3f.firebasestorage.app`. Confirm the project and
bucket exist and are enabled in [Firebase Console](https://console.firebase.google.com/project/the-iah-creationgit-1741-47b3f/overview).
Enable email/password Authentication, create Firestore and Storage resources,
and configure the site's authorized domains.

Review and deploy the rules before accepting user data:

```sh
firebase deploy --only firestore:rules,storage --project the-iah-creationgit-1741-47b3f
```

Chat files are stored under `users/{uid}/chat_uploads/`. A verified user can
list, download, and delete files in that folder from the chat's **Manage my
private files** control. Keep Storage rules scoped to the authenticated UID.

Firebase Web config is public client configuration. Do not put Gemini API keys,
service-account keys, or other server credentials in `config.js` or the
frontend.

## 3. Configure the AI service

The service lives in `server/agent/` and uses FastAPI, LangGraph,
`ChatGoogleGenerativeAI`, Firebase Admin, and Google Gemini. Configure a
least-privileged service account with access to verify Firebase ID tokens,
enforce Firestore rate limits, and read the private Storage objects used for
chat attachments. Set `GEMINI_API_KEY`, `FIREBASE_STORAGE_BUCKET`, and the
exact `AI_AGENT_ALLOWED_ORIGINS` server-side.

The frontend reads the service URL from `window.IAH_CONFIG.agentApiUrl` in
`config.js`. The UI's model choices and the server allowlist in
`server/agent/main.py` must agree. The current allowlist covers text
generation only; Gemini Live, speech generation, embeddings, image, and video
APIs need separate integrations and are not enabled by these settings.

Run focused API tests after installing `server/agent/requirements.txt`:

```sh
python -m unittest discover -s server/agent -p 'test_main.py'
```

## 4. Hosting

### GitHub Pages (currently configured)

The repository is configured for GitHub Pages from `main`. A successful push
to that branch updates the site served from the repository root. This is the
branch-based Pages configuration; no repository Pages workflow is configured.
Check the deployment status in repository **Settings → Pages**:

`https://github.com/infinity-aggarwalharshul/The-IAH-Creations/settings/pages`

### Cloudflare Pages (requires account setup)

Cloudflare Pages is not currently configured for this repository. In the
Cloudflare dashboard, create or connect a Pages project to this GitHub
repository and choose:

- Production branch: `main`
- Build command: `sh scripts/build-pages.sh`
- Build output directory: `dist`

After connecting it, pushes to `main` can trigger Cloudflare deployments. For
a manual deployment, first authenticate Wrangler to the correct Cloudflare
account, then run:

```sh
npx wrangler pages deploy dist --project-name=YOUR_PAGES_PROJECT
```

Do not create a new Pages project unless you have confirmed the intended
account and project name.

## 5. Automatic site updates

After a new build is deployed, the service worker checks for the updated
worker on page visits, when the page becomes visible, and periodically while
open. It activates the new worker and reloads the app; when it detects
unsaved builder/chat work, it asks before reloading. Browser support and
hosting cache headers affect update timing.

This mechanism updates only the static frontend after a deployment. It does
not automatically update server dependencies, Firebase resources or rules,
third-party model versions, model allowlists, or legal content. Review and test
those changes separately.

## 6. Verify before launch

- Confirm Firebase Authentication, Firestore, Storage, and security rules in
  the target Firebase project.
- Verify uploads, private file listing/download/deletion, and server-side file
  extraction using a test account.
- Confirm AI requests use the configured server endpoint and that its API key
  is stored in a server-side secret manager.
- Run the Python tests and review generated project files before deployment.
- Check the hosting provider's deployment result and load the deployed site
  over HTTPS.
