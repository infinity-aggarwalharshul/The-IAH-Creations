import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../utils/constants.dart';

class SocialLinksSection extends StatelessWidget {
  const SocialLinksSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Connect With Us',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 24),
          _buildSocialGrid(),
          const SizedBox(height: 32),
          _buildBusinessLinks(),
        ],
      ),
    );
  }

  Widget _buildSocialGrid() {
    final socialLinks = [
      {'name': 'Instagram', 'url': AppConstants.instagram, 'icon': Icons.camera_alt, 'color': const Color(0xFFE4405F)},
      {'name': 'LinkedIn', 'url': AppConstants.linkedin, 'icon': Icons.business, 'color': const Color(0xFF0077B5)},
      {'name': 'GitHub', 'url': AppConstants.github, 'icon': Icons.code, 'color': const Color(0xFF333333)},
      {'name': 'YouTube', 'url': AppConstants.youtube, 'icon': Icons.play_arrow, 'color': const Color(0xFFFF0000)},
      {'name': 'WhatsApp', 'url': AppConstants.whatsapp, 'icon': Icons.message, 'color': const Color(0xFF25D366)},
      {'name': 'Telegram', 'url': AppConstants.telegram, 'icon': Icons.send, 'color': const Color(0xFF0088CC)},
    ];

    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 3,
        crossAxisSpacing: 16,
        mainAxisSpacing: 16,
        childAspectRatio: 1.2,
      ),
      itemCount: socialLinks.length,
      itemBuilder: (context, index) {
        final link = socialLinks[index];
        return _buildSocialCard(
          link['name'] as String,
          link['url'] as String,
          link['icon'] as IconData,
          link['color'] as Color,
        );
      },
    );
  }

  Widget _buildSocialCard(String name, String url, IconData icon, Color color) {
    return GestureDetector(
      onTap: () => _launchUrl(url),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: const Color(0xFF1A1A2E),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: color.withOpacity(0.3)),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 40,
              height: 40,
              decoration: BoxDecoration(
                color: color.withOpacity(0.2),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Icon(icon, color: color, size: 20),
            ),
            const SizedBox(height: 8),
            Text(
              name,
              style: const TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBusinessLinks() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Business Resources',
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
        const SizedBox(height: 16),
        _buildBusinessCard('Portfolio', 'View our complete portfolio', Icons.work, AppConstants.portfolio),
        const SizedBox(height: 12),
        _buildBusinessCard('Brochure', 'Download company brochure', Icons.picture_as_pdf, AppConstants.brochure),
        const SizedBox(height: 12),
        _buildBusinessCard('Order Form', 'Place your project order', Icons.assignment, AppConstants.orderForm),
        const SizedBox(height: 12),
        _buildBusinessCard('Website', 'Visit our main website', Icons.language, AppConstants.website),
      ],
    );
  }

  Widget _buildBusinessCard(String title, String subtitle, IconData icon, String url) {
    return GestureDetector(
      onTap: () => _launchUrl(url),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: const Color(0xFF1A1A2E),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: const Color(0xFF3B82F6).withOpacity(0.3)),
        ),
        child: Row(
          children: [
            Container(
              width: 48,
              height: 48,
              decoration: BoxDecoration(
                color: const Color(0xFF3B82F6).withOpacity(0.2),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(icon, color: const Color(0xFF3B82F6), size: 24),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    subtitle,
                    style: const TextStyle(
                      fontSize: 12,
                      color: Colors.white70,
                    ),
                  ),
                ],
              ),
            ),
            const Icon(Icons.arrow_forward_ios, color: Colors.white54, size: 16),
          ],
        ),
      ),
    );
  }

  Future<void> _launchUrl(String url) async {
    final uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }
}