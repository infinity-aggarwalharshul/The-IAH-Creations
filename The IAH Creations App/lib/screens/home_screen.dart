import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../utils/constants.dart';
import '../services/ai_service.dart';
import '../widgets/holographic_card.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:url_launcher/url_launcher.dart';
import 'legal_screen.dart';
import 'builder_screen.dart';

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppConstants.backgroundColor,
      body: SingleChildScrollView(
        child: Column(
          children: [
            _buildHereSection(context),
            _buildQuickLinks(context),
            _buildFeaturesGrid(context),
            _buildLinktreeSection(context),
            _buildPaymentSection(context),
            _buildFooter(context),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: AppConstants.primaryColor,
        onPressed: () {
          // Open Chat
        },
        child: Icon(Icons.chat_bubble_outline),
      ),
    );
  }

  Widget _buildHereSection(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.fromLTRB(20, 80, 20, 60),
            decoration: BoxDecoration(
              image: DecorationImage(
                image: AssetImage('assets/hero_promo.jpg'),
                fit: BoxFit.cover,
                opacity: 0.2, // Darken background image
              ),
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  Color(0xFF1E1B4B).withOpacity(0.9), // Higher opacity to blend
                  AppConstants.backgroundColor,
                ],
              ),
            ),
      child: Column(
        children: [
          Container(
            padding: EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.1),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: Colors.green.withOpacity(0.5)),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                CircleAvatar(backgroundColor: Colors.green, radius: 4),
                SizedBox(width: 8),
                Text(
                  'Commercial Build v${AppConstants.appVersion} - Production Ready',
                  style: TextStyle(color: Colors.white, fontSize: 12),
                ),
              ],
            ),
          ),
          SizedBox(height: 24),
          Text(
            'Enterprise-Grade AI Platform',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 32,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          SizedBox(height: 8),
          ShaderMask(
            shaderCallback: (bounds) => AppConstants.primaryGradient.createShader(bounds),
            child: Text(
              'Multi-Database • 20+ Languages • Voice AI',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
          ),
          SizedBox(height: 24),
          Text(
            'Transform your ideas into production-ready websites with Gemini 2.0 AI, Firebase, RTL support, and voice recognition.',
            textAlign: TextAlign.center,
            style: TextStyle(color: Colors.grey[400], fontSize: 16),
          ),
          SizedBox(height: 40),
          Wrap(
            spacing: 16,
            runSpacing: 16,
            alignment: WrapAlignment.center,
            children: [
              ElevatedButton(
                onPressed: () {
                   Navigator.push(context, MaterialPageRoute(builder: (_) => BuilderScreen()));
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppConstants.primaryColor,
                  padding: EdgeInsets.symmetric(horizontal: 24, vertical: 16),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                child: Text('Create App with AI', style: TextStyle(color: Colors.white)),
              ),
              OutlinedButton(
                onPressed: () async {
                  if (await canLaunchUrl(Uri.parse(AppConstants.businessCardUrl))) {
                    await launchUrl(Uri.parse(AppConstants.businessCardUrl));
                  }
                },
                style: OutlinedButton.styleFrom(
                  side: BorderSide(color: Colors.grey),
                  padding: EdgeInsets.symmetric(horizontal: 24, vertical: 16),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                child: Text('Virtual Business Card', style: TextStyle(color: Colors.white)),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildQuickLinks(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Expanded(
            child: HolographicCard(
              onTap: () => launchUrl(Uri.parse(AppConstants.brochureUrl)),
              child: Column(
                children: [
                  Icon(FontAwesomeIcons.filePdf, color: Colors.orange, size: 30),
                  SizedBox(height: 8),
                  Text('Download Brochure', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                ],
              ),
            ),
          ),
          SizedBox(width: 12),
          Expanded(
            child: HolographicCard(
              onTap: () => launchUrl(Uri.parse(AppConstants.orderFormUrl)),
              child: Column(
                children: [
                  Icon(FontAwesomeIcons.clipboardCheck, color: Colors.green, size: 30),
                  SizedBox(height: 8),
                  Text('Order Project', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLinktreeSection(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(20.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Connect With Us', style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold)),
          SizedBox(height: 20),
          HolographicCard(
            child: ListView.separated(
              physics: NeverScrollableScrollPhysics(),
              shrinkWrap: true,
              itemCount: AppConstants.socialLinks.length > 5 ? 5 : AppConstants.socialLinks.length, // Show top 5
              separatorBuilder: (c, i) => Divider(color: Colors.grey[800]),
              itemBuilder: (context, index) {
                final link = AppConstants.socialLinks[index];
                return ListTile(
                  leading: Icon(FontAwesomeIcons.link, color: Colors.blue),
                  title: Text(link['title']!, style: TextStyle(color: Colors.white)),
                  trailing: Icon(Icons.arrow_forward_ios, color: Colors.grey, size: 16),
                  onTap: () => launchUrl(Uri.parse(link['url']!)),
                );
              },
            ),
          ),
          SizedBox(height: 12),
          Center(
             child: TextButton(
               onPressed: () => launchUrl(Uri.parse(AppConstants.linkTreeUrl)),
               child: Text('View All Links', style: TextStyle(color: AppConstants.accentColor)),
             ),
          ),
        ],
      ),
    );
  }

  Widget _buildPaymentSection(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(20.0),
      child: Column(
        children: [
          Text('Secure Payment', style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold)),
          SizedBox(height: 20),
          HolographicCard(
            child: Column(
              children: [
                Container(
                  padding: EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Image.asset(
                    AppConstants.upiQrAsset, 
                    width: 200, 
                    height: 200,
                  ),
                ),
                SizedBox(height: 16),
                Text(
                  AppConstants.upiId,
                  style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold),
                ),
                SizedBox(height: 8),
                Text(
                  'Scan to Pay via UPI / Crypto / Any Currency',
                  textAlign: TextAlign.center,
                  style: TextStyle(color: Colors.grey[400], fontSize: 12),
                ),
                 SizedBox(height: 12),
                 Row(
                   mainAxisAlignment: MainAxisAlignment.center,
                   children: [
                     Icon(FontAwesomeIcons.bitcoin, color: Colors.orange),
                     SizedBox(width: 8),
                     Icon(FontAwesomeIcons.ccVisa, color: Colors.blue),
                     SizedBox(width: 8),
                     Icon(FontAwesomeIcons.ccMastercard, color: Colors.red),
                   ],
                 )
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFeaturesGrid(BuildContext context) {
    final features = [
      {'icon': FontAwesomeIcons.robot, 'title': 'Gemini 2.0 AI', 'desc': 'Real-time AI chatbot powered by Google Gemini 2.0.'},
      {'icon': FontAwesomeIcons.shieldHalved, 'title': 'Firebase Security', 'desc': 'Enterprise-grade security with RBAC.'},
      {'icon': FontAwesomeIcons.database, 'title': 'Multi-Database', 'desc': 'Support for SQL, NoSQL, and Vector DBs.'},
      {'icon': FontAwesomeIcons.earthAmericas, 'title': 'Globalization', 'desc': '20+ Languages with RTL support.'},
    ];

    return Padding(
      padding: const EdgeInsets.all(20.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Platform Features', style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold)),
          SizedBox(height: 20),
          GridView.builder(
            physics: NeverScrollableScrollPhysics(),
            shrinkWrap: true,
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: MediaQuery.of(context).size.width > 600 ? 4 : 2,
              crossAxisSpacing: 16,
              mainAxisSpacing: 16,
              childAspectRatio: 0.8,
            ),
            itemCount: features.length,
            itemBuilder: (context, index) {
              return HolographicCard(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(features[index]['icon'] as IconData, size: 40, color: Colors.blueAccent),
                    SizedBox(height: 16),
                    Text(
                      features[index]['title'] as String,
                      textAlign: TextAlign.center,
                      style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16),
                    ),
                    SizedBox(height: 8),
                    Text(
                      features[index]['desc'] as String,
                      textAlign: TextAlign.center,
                      style: TextStyle(color: Colors.grey, fontSize: 12),
                    ),
                  ],
                ),
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildFooter(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(20.0),
      child: Column(
        children: [
          Divider(color: Colors.grey[800]),
          SizedBox(height: 20),
          Wrap(
            alignment: WrapAlignment.center,
            spacing: 20,
            children: [
              TextButton(
                onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (_) => LegalScreen(isPrivacyPolicy: true))),
                child: Text('Privacy Policy', style: TextStyle(color: Colors.grey)),
              ),
              TextButton(
                onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (_) => LegalScreen(isPrivacyPolicy: false))),
                child: Text('Terms of Service', style: TextStyle(color: Colors.grey)),
              ),
            ],
          ),
          SizedBox(height: 10),
          Text(
            '© 2025 The IAH Creations. All rights reserved.',
            style: TextStyle(color: Colors.grey[600]),
          ),
        ],
      ),
    );
  }
}