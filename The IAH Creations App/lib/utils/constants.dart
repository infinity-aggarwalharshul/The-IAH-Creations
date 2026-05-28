import 'package:flutter/material.dart';

class AppConstants {
  static const String appName = 'The IAH Creations';
  static const String appVersion = '5.0.0';
  static const String businessCardUrl = 'https://infinity-aggarwalharshul.github.io/The-IAH-Creations-Virtual-Business-Card/';
  static const String contactEmail = 'theiahcreations@gmail.com';
  
  // New Links from User Request
  static const String brochureUrl = 'https://drive.google.com/file/d/1MtI2Y-SgU5keuF1m7Ui9DDpfJFJn3exL/view?usp=drive_link';
  static const String orderFormUrl = 'https://forms.gle/sTo498G6nPUpPrDQA';
  static const String linkTreeUrl = 'https://linktr.ee/theiahcreations';

  // Firebase Configuration (for reference/manual config if needed)
  static const String firebaseProjectId = 'the-iah-creations-app';
  static const String firebaseProjectNumber = '148852360210';

  // Payments
  static const String upiId = 'aggarwalharshul49@okicici';
  static const String upiQrAsset = 'assets/upi_qr.jpg'; // Copied asset path
  
  // Colors
  static const Color primaryColor = Color(0xFF2563EB); // Blue 600
  static const Color secondaryColor = Color(0xFF9333EA); // Purple 600
  static const Color backgroundColor = Color(0xFF111827); // Gray 900
  static const Color surfaceColor = Color(0xFF1F2937); // Gray 800
  static const Color accentColor = Color(0xFF4ADE80); // Green 400
  
  // Gradients
  static const LinearGradient primaryGradient = LinearGradient(
    colors: [primaryColor, secondaryColor],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
  
  static const LinearGradient backgroundGradient = LinearGradient(
    colors: [Color(0xFF111827), Color(0xFF1E1B4B), Color(0xFF312E81)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  // Linktree Data
  static const List<Map<String, String>> socialLinks = [
    {"title": "Instagram", "url": "https://instagram.com/theiahcreations"},
    {"title": "YouTube", "url": "https://www.youtube.com/@theiahcreations"},
    {"title": "Threads", "url": "https://www.threads.com/@theiahcreations"},
    {"title": "Facebook", "url": "https://www.facebook.com/share/17bj6apegR/"},
    {"title": "LinkedIn", "url": "https://www.linkedin.com/company/the-iah-creations/"},
    {"title": "WhatsApp Channel", "url": "https://whatsapp.com/channel/0029Vb6p2x0IHphLdvVfDp23"},
    {"title": "Discord Server", "url": "https://discord.gg/fS93jmzJbd"},
    {"title": "X (Twitter)", "url": "https://x.com/theiahcreations"},
    {"title": "Web: Official Site", "url": "https://the-iah-creations.pages.dev/"},
    {"title": "Web: Digital Card", "url": "https://the-iah-creations-virtual-business-card.pages.dev"},
    {"title": "Infinity Aggarwal Harshul", "url": "https://sites.google.com/view/infinityaggarwalharshul/home?fbclid=PAZXh0bgNhZW0CMTEAAaaiOWjxBFlVwHPUpVKQVUtwYAeyCYtqWGPrq-6rfyPl4durwvAa6uHeu_M_aem_wOdr8wnathvWu-mm6oDeTQ"},
  ];
}
