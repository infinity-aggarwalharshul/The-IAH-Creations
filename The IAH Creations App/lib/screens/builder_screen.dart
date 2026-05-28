import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/ai_service.dart';
import '../utils/constants.dart';
import '../widgets/holographic_card.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:flutter_animate/flutter_animate.dart';

class BuilderScreen extends StatefulWidget {
  @override
  _BuilderScreenState createState() => _BuilderScreenState();
}

class _BuilderScreenState extends State<BuilderScreen> {
  final TextEditingController _promptController = TextEditingController();
  String _selectedType = 'Website';
  String _selectedLanguage = 'Flutter (Dart)';
  bool _isGenerating = false;
  String? _generatedResult;
  bool _showPayment = false;

  final List<String> _types = ['Website', 'Mobile App', 'Web App', 'Backend API'];
  final List<String> _languages = [
    'Flutter (Dart)', 
    'React (JS/TS)', 
    'Python (Django/Flask)', 
    'Node.js (Express)', 
    'HTML/Tailwind', 
    'Swift (iOS)', 
    'Kotlin (Android)',
    'Go (Golang)',
    'Rust'
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('AI App Builder'), backgroundColor: Colors.transparent),
      backgroundColor: AppConstants.backgroundColor,
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _buildHeader(),
            SizedBox(height: 20),
            if (!_showPayment && _generatedResult == null) _buildInputForm(),
            if (_isGenerating) _buildLoading(),
            if (_showPayment) _buildPaymentGate(),
            if (_generatedResult != null && !_showPayment) _buildResultView(),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Column(
      children: [
        Icon(FontAwesomeIcons.wandMagicSparkles, size: 40, color: AppConstants.accentColor)
            .animate().scale(duration: 600.ms, curve: Curves.elasticOut),
        SizedBox(height: 10),
        Text(
          'Turn Ideas into Reality',
          textAlign: TextAlign.center,
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white),
        ),
        Text(
          'Describe your dream app, pick a tech stack, and let AI build it.',
          textAlign: TextAlign.center,
          style: TextStyle(color: Colors.grey),
        ),
      ],
    );
  }

  Widget _buildInputForm() {
    return HolographicCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Project Type', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
          SizedBox(height: 8),
          DropdownButtonFormField<String>(
             value: _selectedType,
             dropdownColor: AppConstants.surfaceColor,
             style: TextStyle(color: Colors.white),
             decoration: InputDecoration(
               border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
               filled: true,
               fillColor: Colors.black12,
             ),
             items: _types.map((t) => DropdownMenuItem(value: t, child: Text(t))).toList(),
             onChanged: (v) => setState(() => _selectedType = v!),
          ),
          SizedBox(height: 16),
          Text('Target Language / Framework', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
          SizedBox(height: 8),
          DropdownButtonFormField<String>(
             value: _selectedLanguage,
             dropdownColor: AppConstants.surfaceColor,
             style: TextStyle(color: Colors.white),
             decoration: InputDecoration(
               border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
               filled: true,
               fillColor: Colors.black12,
             ),
             items: _languages.map((l) => DropdownMenuItem(value: l, child: Text(l))).toList(),
             onChanged: (v) => setState(() => _selectedLanguage = v!),
          ),
          SizedBox(height: 16),
          Text('Description', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
          SizedBox(height: 8),
          TextField(
            controller: _promptController,
            maxLines: 5,
            style: TextStyle(color: Colors.white),
            decoration: InputDecoration(
              hintText: 'E.g., A delivery app with map tracking...',
              hintStyle: TextStyle(color: Colors.grey),
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
              filled: true,
              fillColor: Colors.black12,
            ),
          ),
          SizedBox(height: 24),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton.icon(
              icon: Icon(FontAwesomeIcons.bolt),
              label: Text('Generate Code (Freemium)'),
              style: ElevatedButton.styleFrom(
                backgroundColor: AppConstants.primaryColor,
                padding: EdgeInsets.symmetric(vertical: 16),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
              ),
              onPressed: _startGeneration,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLoading() {
    return Center(
      child: Column(
        children: [
          SizedBox(height: 40),
          CircularProgressIndicator(color: AppConstants.accentColor),
          SizedBox(height: 16),
          Text('AI is architecting your solution...', style: TextStyle(color: Colors.white)),
        ],
      ),
    );
  }

  Widget _buildPaymentGate() {
    return HolographicCard(
      child: Column(
        children: [
          Icon(FontAwesomeIcons.lock, size: 50, color: Colors.orange),
          SizedBox(height: 16),
          Text('Unlock Your Code', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white)),
          SizedBox(height: 8),
          Text(
            'Your full project structure is ready! To download the complete source code, please complete the payment.',
            textAlign: TextAlign.center,
            style: TextStyle(color: Colors.grey),
          ),
          SizedBox(height: 24),
          Image.asset(AppConstants.upiQrAsset, height: 200),
          SizedBox(height: 16),
          Text(AppConstants.upiId, style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
          SizedBox(height: 24),
          ElevatedButton(
            onPressed: () {
              setState(() {
                _showPayment = false;
                // In real app, verify payment here
              });
            },
            style: ElevatedButton.styleFrom(backgroundColor: Colors.green),
            child: Text('I Have Paid (Simulate)'),
          ),
        ],
      ),
    );
  }

  Widget _buildResultView() {
    return Column(
      children: [
        HolographicCard(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('Generated Project', style: TextStyle(color: Colors.green, fontWeight: FontWeight.bold)),
                  IconButton(
                    icon: Icon(Icons.copy, color: Colors.white),
                    onPressed: () {
                      // Copy to clipboard
                      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Code Copied!')));
                    },
                  )
                ],
              ),
              Divider(color: Colors.grey),
              Container(
                height: 300,
                padding: EdgeInsets.all(8),
                color: Colors.black,
                child: SingleChildScrollView(
                  child: Text(
                    _generatedResult!,
                    style: TextStyle(fontFamily: 'monospace', color: Colors.greenAccent, fontSize: 12),
                  ),
                ),
              ),
            ],
          ),
        ),
        SizedBox(height: 16),
        ElevatedButton(
          onPressed: () => setState(() {
            _generatedResult = null;
            _promptController.clear();
          }),
          child: Text('Create Another'),
        ),
      ],
    );
  }

  Future<void> _startGeneration() async {
    if (_promptController.text.isEmpty) return;

    setState(() => _isGenerating = true);

    // Simulate AI Delay or Call Gemini
    final aiService = Provider.of<AIService>(context, listen: false);
    // In production, use: await aiService.generateCode(...)
    
    await Future.delayed(Duration(seconds: 3)); // Mock delay
    
    final mockCode = '''
// Generated ${_selectedType} in ${_selectedLanguage}
// Description: ${_promptController.text}

import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text('${_promptController.text}')),
        body: Center(child: Text('AI Generated App')),
      ),
    );
  }
}
// ... Full implementation hidden ...
''';

    setState(() {
      _isGenerating = false;
      _showPayment = true; // Freemium Gate
      _generatedResult = mockCode;
    });
  }
}
