# Security Policy

## 🛡️ Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 5.0.x   | :white_check_mark: |
| 4.4.x   | :white_check_mark: |
| < 4.0   | :x:                |

## 🐛 Reporting a Vulnerability

We take security seriously. If you discover a vulnerability, please follow these steps:

1.  **Do NOT open a public issue.**
2.  Email us immediately at [theiahcreations@gmail.com](mailto:theiahcreations@gmail.com).
3.  Include a description of the vulnerability and steps to reproduce.
4.  We will acknowledge your report within 24 hours.

## 🔐 Security Features

The IAH Creations Platform includes several built-in security features:

- **Blockchain Code Signing**: Verifies code integrity using SHA-256 hashes on the Polygon network.
- **Dark Web Monitoring**: Enterprise tier feature to scan for leaked code.
- **DDoS Protection**: Rate limiting on API endpoints.
- **Input Sanitization**: Prevention of XSS and Injection attacks.

## ⚠️ Important Notes

- **API Keys**: Never commit your real API keys (Razorpay, Stripe, Gemini) to public repositories. Use environment variables or local storage for testing.
- **Payments**: Always verify payment gateway signatures in a production backend environment.

## 🐞 Bug Bounty

We currently do not have a paid bug bounty program, but we gratefully acknowledge all responsible disclosures in our Hall of Fame.
