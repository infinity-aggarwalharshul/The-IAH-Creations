# The IAH Creations App (v5.0.0)

🚀 **Commercial-Ready AI Web Development Platform**

This Flutter application is configured for **Automated Deployment** to the Google Play Store via GitHub Actions.

## 📱 Features

- **AI-Powered Builder**: Prompt-to-App generation with Freemium model.
- **Multi-Database**: Firebase, Cloud SQL support (extensible).
- **Compliance**: Built-in Privacy Policy & Terms of Service screens.
- **Payments**: Integrated UPI/Crypto QR Code & Payment Gate.
- **Resources**: Direct access to Brochures, Order Forms, and Linktree.

## 🛠 Setup & Run

1.  **Dependencies**: `flutter pub get`
2.  **Run**: `flutter run`
3.  **Generate Icons**: `flutter pub run flutter_launcher_icons` (Replace `assets/upi_qr.jpg` with your logo if needed).

## 🚀 Play Store Deployment (Automated)

To enable the **One-Click Deploy** from GitHub:

1.  **Google Play Console**:

    - Create your app.
    - Create a Service Account with "Editor" permissions in Google Cloud Console.
    - Download the JSON key.

2.  **Signing Keys**:

    - Generate an Upload Keystore `.jks`.
    - Base64 encode it: `base64 -w 0 upload-keystore.jks`

3.  **GitHub Secrets**:
    Go to `Settings -> Secrets -> Actions` and add:

    - `PLAY_STORE_UPLOAD_KEY`: Base64 encoded `.jks` file.
    - `PLAY_STORE_SERVICE_ACCOUNT_JSON`: Content of your Google Cloud JSON key.
    - `GOOGLE_SERVICES_JSON`: Base64 encoded `google-services.json`.

4.  **Deploy**:
    - Push to `main` branch: Triggers a release to the **Internal Test Track** (or configure to Production).

## 📄 Legal & Policies

- **Privacy Policy**: Accessible in-app. Compliant with IT Act 2000.
- **Terms**: Accessible in-app.
- **Permissions**: configured for Internet and Audio (Voice AI).

© 2025 The IAH Creations. All rights reserved.
