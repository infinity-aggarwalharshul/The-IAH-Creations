# 🚀 IAH Creations - AI-Powered Web Development Platform

[![Version](https://img.shields.io/badge/version-4.4.0-blue.svg)](https://github.com/iahcreations/platform)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/iahcreations/platform/graphs/commit-activity)

> **Enterprise-Grade Web Development Platform with AI, Multi-Database Support, Globalization, and Academic Research Integration**

Transform your web development workflow with cutting-edge AI, trillion-scale databases, 20+ language support, and Google Scholar integration—all in one powerful platform.

---

## 📑 **Table of Contents**

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Live Demo](#-live-demo)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Documentation](#-documentation)
- [Architecture](#-architecture)
- [Usage Examples](#-usage-examples)
- [Pricing](#-pricing)
- [Deployment](#-deployment)
- [Legal & Licensing](#-legal--licensing)
- [Contributing](#-contributing)
- [Support](#-support)
- [Roadmap](#-roadmap)

- ✅ RTL Support - Full Arabic & Hebrew compatibility
- ✅ Auto-Language Detection - Smart browser detection

### **🎓 Google Scholar (Pro/Enterprise)**

- ✅ Search 1000s of research papers
- ✅ Citation Analysis & trends
- ✅ Bibliography Generator - APA, MLA, Chicago, BibTeX
- ✅ AI Research Assistant
- ✅ Export Tools - JSON, CSV, BibTeX

### **📁 Multi-Modal Input**

- ✅ Video Upload - MP4, WebM, MOV, AVI (up to 500MB)
- ✅ Audio Upload - MP3, WAV, OGG, M4A
- ✅ Text Processing - TXT, PDF, DOC, DOCX
- ✅ AI-powered content analysis

### **🎤 Voice Features**

- ✅ Speech Recognition - 12+ languages
- ✅ Voice Synthesis - Native accents
- ✅ Voice Search - Hands-free navigation
- ✅ Gemini Live - Real-time AI conversations
- ✅ Multi-Language Voice

### **💰 Pricing**

| Tier           | Price    | AI Queries | Uploads   | Databases   | Scholar    |
| -------------- | -------- | ---------- | --------- | ----------- | ---------- |
| **Free**       | ₹0       | 10/day     | 3/day     | Firestore   | ❌         |
| **Pro**        | ₹999/mo  | 1000/day   | 100/day   | + Cloud SQL | ✅ 50/day  |
| **Enterprise** | ₹4999/mo | Unlimited  | Unlimited | All 5       | ✅ 500/day |

---

## 🎬 **Live Demo**

🔗 **[Try Live Demo](https://iahcreations.com)** _(Coming Soon)_

---

## 🛠️ **Tech Stack**

### **Frontend**

-HTML5, CSS3, Tailwind CSS, Vanilla JavaScript, PWA

### **Backend Services**

- Firebase, Google Cloud (SQL, BigQuery, Spanner, Bigtable)
- Google AI (Gemini 2.0 Flash)
- Google Translate & Cloud Speech APIs
- SerpAPI (Google Scholar)

---

## 🚀 **Quick Start**

### **Installation**

```bash
# Clone repository
git clone https://github.com/iahcreations/platform.git
cd platform

# Open in browser
# Simply open index.html
# OR use local server:

# Option 1: Python
python -m http.server 8000

# Option 2: Node.js
npx serve .

# Option 3: VS Code Live Server extension
```

### **Configuration**

1.  **Firebase Setup (Recommended for Production)**
    - **Why Firebase?** We recommend Google Firebase because it offers a generous **Spark Plan (Free)** which includes:
      - **Hosting**: Fast and secure global hosting.
      - **Firestore Database**: Up to **50,000 reads/day** and **20,000 writes/day** (approx. 2M requests/month) for free.
      - **Authentication**: Unlimited email/social logins.
    - **How to Setup**:
      1.  Go to [console.firebase.google.com](https://console.firebase.google.com/).
      2.  Create a new project "IAH-Creations-Platform".
      3.  Enable **Firestore Database** and **Authentication** (Email/Google).
      4.  Copy your web app configuration keys.
      5.  Replace the `firebaseConfig` object in `index.html` (line ~550):

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef",
};
```

2.  **Gemini API** (line ~700)

```javascript
AIHub.models.gemini.apiKey = "YOUR_GEMINI_API_KEY";
```

---

## 📞 **Contact & Support**

For enterprise inquiries, technical support, or custom AI solutions:

- **Email**: [theiahcreations@gmail.com](mailto:theiahcreations@gmail.com)
- **YouTube**: [The IAH Creations](https://www.youtube.com/@theiahcreations)
- **Instagram**: [@theiahcreations](https://www.instagram.com/theiahcreations?igsh=MXdpbnhkMWVkcjdn)

---

## 📚 **Documentation**

- 📖 [Deployment Guide](DEPLOYMENT_GUIDE.md)
- 🗄️ [Database & Scholar Guide](DATABASE_SCHOLAR.md)
- 🌍 [Globalization Guide](GLOBALIZATION.md)
- 🤖 [AI/ML Hub Guide](AI_ML_HUB.md)
- ⚡ [Quantum Query Engine](QUANTUM_QUERY_ENGINE.md)
- 🎨 [Advanced Features](ADVANCED_FEATURES.md)
- ⚖️ [Legal Guide](LEGAL_GUIDE.md)

---

## 🏗️ **Architecture**

```
IAH Creations Platform v4.4.0
│
├── 🤖 AIHub (Gemini 2.0, NLP, Sentiment)
├── 🗄️ DatabaseHub (5 Google Cloud Databases)
├── 🌍 GlobalizationHub (20+ Languages)
├── 🎓 GoogleScholarHub (Research Tools)
├── 📁 MediaHub (Video/Audio/Text)
├── 🎤 VoiceEngine (Speech Recognition)
├── 💬 GeminiLive (Real-time AI Chat)
├── 💡 BrainstormingAssistant
├── 💰 FreemiumModel
└── ⚡ QuantumQueryEngine (Trillion-scale)
```

---

## 💡 **Usage Examples**

### **AI Search**

```javascript
const results = await AIHub.assistUser("Find modern templates");
```

### **Translation**

```javascript
await GlobalizationHub.changeLanguage("es");
```

### **Database Query**

```javascript
const users = await DatabaseHub.firestore.query("users", [
  { field: "plan", operator: "==", value: "pro" },
]);
```

### **Academic Research**

```javascript
const papers = await GoogleScholarHub.searchPapers("AI trends", {
  yearFrom: 2020,
  limit: 20,
});
```

---

## 🚀 **Deployment**

### **Cloudflare Pages** (Recommended)

```bash
npx wrangler pages publish .
```

### **Vercel**

```bash
npx vercel --prod
```

### **Netlify**

```bash
npx netlify deploy --prod --dir=.
```

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for details.

---

## ⚖️ **Legal & Licensing**

### **License**

MIT License with Commercial Addendum - see [LICENSE](LICENSE)

### **Intellectual Property**

- **Copyright** © 2025 IAH Creations - [COPYRIGHT](COPYRIGHT)
- **Trademarks** - All marks protected - [TRADEMARK](TRADEMARK)
- **Legal Guide** - [LEGAL_GUIDE.md](LEGAL_GUIDE.md)

### **Compliance**

✅ Indian Law - Copyright Act 1957, Trade Marks Act 1999, IT Act 2000  
✅ International - Berne Convention, WIPO, TRIPS, Madrid Protocol  
✅ Data Protection - IT Rules 2011, GDPR, CCPA

---

## 🤝 **Contributing**

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md)

### **Ways to Contribute**

- 🐛 Report bugs
- 💡 Suggest features
- 📝 Improve documentation
- 🔧 Submit pull requests
- ⭐ Star the repository

---

## 💬 **Support**

- 📧 Email: support@iahcreations.com
- 🐛 Issues: [GitHub Issues](https://github.com/iahcreations/platform/issues)
- 💡 Discussions: [GitHub Discussions](https://github.com/iahcreations/platform/discussions)

### **Response Times**

- Free: Community support
- Pro: 24 hours
- Enterprise: 24/7, 2-hour SLA

---

## 🗓️ **Roadmap**

### **Q1 2026**

- [ ] Mobile app (React Native)
- [ ] Desktop app (Electron)
- [ ] Additional AI models
- [ ] More database integrations
- [ ] Advanced analytics dashboard

### **Long-term**

- [ ] AI-generated code
- [ ] Auto-deployment pipelines
- [ ] Built-in CMS
- [ ] Enterprise SSO

---

## 🎯 **Project Status**

✅ Core Platform - Stable (v4.4.0)  
✅ AI Integration - Production-ready  
✅ Database System - Fully functional  
✅ Globalization - 20+ languages  
✅ Google Scholar - Operational  
✅ Legal Protection - Complete  
✅ Documentation - Comprehensive

---

## 🌟 **Acknowledgments**

**Built With:**

- [Firebase](https://firebase.google.com/)
- [Google Cloud Platform](https://cloud.google.com/)
- [Google Gemini](https://ai.google.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 📊 **Stats**

![GitHub stars](https://img.shields.io/github/stars/iahcreations/platform?style=social)
![GitHub forks](https://img.shields.io/github/forks/iahcreations/platform?style=social)

---

## 📄 **License**

Copyright © 2025 [IAH Creations](https://iahcreations.com)

This project is [MIT with Commercial Addendum](LICENSE) licensed.

---

## 📞 **Contact**

**IAH Creations**  
📍 Jaipur, Rajasthan, India  
📧 contact@iahcreations.com  
🌐 https://iahcreations.com

---

<div align="center">

**⭐ Star us on GitHub — it motivates us a lot!**

Made with ❤️ by [IAH Creations](https://iahcreations.com)

[Website](https://iahcreations.com) · [Documentation](docs/) · [Report Bug](https://github.com/iahcreations/platform/issues) · [Request Feature](https://github.com/iahcreations/platform/issues)
IAH Creations Platform v4.4.0
│
├── 🤖 AIHub (Gemini 2.0, NLP, Sentiment)
├── 🗄️ DatabaseHub (5 Google Cloud Databases)
├── 🌍 GlobalizationHub (20+ Languages)
├── 🎓 GoogleScholarHub (Research Tools)
├── 📁 MediaHub (Video/Audio/Text)
├── 🎤 VoiceEngine (Speech Recognition)
├── 💬 GeminiLive (Real-time AI Chat)
├── 💡 BrainstormingAssistant
├── 💰 FreemiumModel
└── ⚡ QuantumQueryEngine (Trillion-scale)

---

## 💡 **Usage Examples**

### **AI Search**

```javascript
const results = await AIHub.assistUser("Find modern templates");
```

### **Translation**

```javascript
await GlobalizationHub.changeLanguage("es");
```

### **Database Query**

```javascript
const users = await DatabaseHub.firestore.query("users", [
  { field: "plan", operator: "==", value: "pro" },
]);
```

### **Academic Research**

```javascript
const papers = await GoogleScholarHub.searchPapers("AI trends", {
  yearFrom: 2020,
  limit: 20,
});
```

---

## 🚀 **Deployment**

### **Cloudflare Pages** (Recommended)

```bash
npx wrangler pages publish .
```

### **Vercel**

```bash
npx vercel --prod
```

### **Netlify**

```bash
npx netlify deploy --prod --dir=.
```

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for details.

---

## ⚖️ **Legal & Licensing**

### **License**

MIT License with Commercial Addendum - see [LICENSE](LICENSE)

### **Intellectual Property**

- **Copyright** © 2025 IAH Creations - [COPYRIGHT](COPYRIGHT)
- **Trademarks** - All marks protected - [TRADEMARK](TRADEMARK)
- **Legal Guide** - [LEGAL_GUIDE.md](LEGAL_GUIDE.md)

### **Compliance**

✅ Indian Law - Copyright Act 1957, Trade Marks Act 1999, IT Act 2000  
✅ International - Berne Convention, WIPO, TRIPS, Madrid Protocol  
✅ Data Protection - IT Rules 2011, GDPR, CCPA

---

## 🤝 **Contributing**

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md)

### **Ways to Contribute**

- 🐛 Report bugs
- 💡 Suggest features
- 📝 Improve documentation
- 🔧 Submit pull requests
- ⭐ Star the repository

---

## 💬 **Support**

- 📧 Email: support@iahcreations.com
- 🐛 Issues: [GitHub Issues](https://github.com/iahcreations/platform/issues)
- 💡 Discussions: [GitHub Discussions](https://github.com/iahcreations/platform/discussions)

### **Response Times**

- Free: Community support
- Pro: 24 hours
- Enterprise: 24/7, 2-hour SLA

---

## 🗓️ **Roadmap**

### **Q1 2026**

- [ ] Mobile app (React Native)
- [ ] Desktop app (Electron)
- [ ] Additional AI models
- [ ] More database integrations
- [ ] Advanced analytics dashboard

### **Long-term**

- [ ] AI-generated code
- [ ] Auto-deployment pipelines
- [ ] Built-in CMS
- [ ] Enterprise SSO

---

## 🎯 **Project Status**

✅ Core Platform - Stable (v4.4.0)  
✅ AI Integration - Production-ready  
✅ Database System - Fully functional  
✅ Globalization - 20+ languages  
✅ Google Scholar - Operational  
✅ Legal Protection - Complete  
✅ Documentation - Comprehensive

---

## 🌟 **Acknowledgments**

**Built With:**

- [Firebase](https://firebase.google.com/)
- [Google Cloud Platform](https://cloud.google.com/)
- [Google Gemini](https://ai.google.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 📊 **Stats**

![GitHub stars](https://img.shields.io/github/stars/iahcreations/platform?style=social)
![GitHub forks](https://img.shields.io/github/forks/iahcreations/platform?style=social)

---

## 📄 **License**

Copyright © 2025 [IAH Creations](https://iahcreations.com)

This project is [MIT with Commercial Addendum](LICENSE) licensed.

---

## 📞 **Contact**

**IAH Creations**  
📍 Jaipur, Rajasthan, India  
📧 contact@iahcreations.com  
🌐 https://iahcreations.com

---

<div align="center">

**⭐ Star us on GitHub — it motivates us a lot!**

Made with ❤️ by [IAH Creations](https://iahcreations.com)

[Website](https://iahcreations.com) · [Documentation](docs/) · [Report Bug](https://github.com/iahcreations/platform/issues) · [Request Feature](https://github.com/iahcreations/platform/issues)

</div>

---

**Version**: 4.4.0
**Last Updated**: November 24, 2025  
**Status**: ✅ Production Ready  
**License**: MIT with Commercial Addendum
