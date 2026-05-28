import 'package:flutter/material.dart';
import '../../utils/constants.dart';
import 'package:flutter_markdown/flutter_markdown.dart';

class LegalScreen extends StatelessWidget {
  final bool isPrivacyPolicy;

  const LegalScreen({Key? key, required this.isPrivacyPolicy}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(isPrivacyPolicy ? 'Privacy Policy' : 'Terms of Service'),
        backgroundColor: AppConstants.backgroundColor,
      ),
      body: Markdown(
        data: isPrivacyPolicy ? _privacyPolicy : _termsOfService,
        styleSheet: MarkdownStyleSheet.fromTheme(Theme.of(context)),
      ),
    );
  }

  static const String _privacyPolicy = '''
# Privacy Policy for The IAH Creations App

**Effective Date:** January 1, 2025

The IAH Creations ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share your personal information when you use our mobile application.

## 1. Information We Collect
- **Personal Information:** Name, Email address (via Google Sign-in or Contact Forms).
- **Usage Data:** App interactions, crash logs, and performance data via Firebase Analytics.
- **AI Interactions:** Prompts and generated content are processed by Gemini AI but not permanently stored by us without consent.

## 2. How We Use Your Information
- To provide and maintain the Service.
- To process payments (UPI/Crypto/Gateways).
- To improve our AI models and user experience.
- To comply with Indian Information Technology Act, 2000 and Rules.

## 3. Data Security
We use industry-standard security measures (Firebase Auth, Encryption) to protect your data.

## 4. Contact Us
For any questions, contact us at: ${AppConstants.contactEmail}
''';

  static const String _termsOfService = '''
# Terms of Service

**Last Updated:** January 1, 2025

## 1. Acceptance of Terms
By accessing or using The IAH Creations App, you agree to be bound by these Terms.

## 2. Use of Service
- You must be 18 years or older to use this service for commercial purposes.
- You agree not to misuse the AI generation tools for illegal or harmful content.

## 3. Payments & Refunds
- All payments for templates and generated apps are final.
- We support UPI, Crypto, and standard Credit/Debit cards.

## 4. Intellectual Property
- Generated code becomes the property of the user upon successful payment.
- The IAH Creations retains rights to the underlying platform and templates.

## 5. Governing Law
These terms are governed by the laws of India.
''';
}
