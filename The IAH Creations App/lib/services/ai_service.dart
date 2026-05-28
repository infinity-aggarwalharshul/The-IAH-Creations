import 'package:google_generative_ai/google_generative_ai.dart';
import 'package:flutter/foundation.dart';

class AIService extends ChangeNotifier {
  GenerativeModel? _model;
  final List<Content> _chatHistory = [];
  bool _isLoading = false;

  bool get isLoading => _isLoading;
  List<Content> get chatHistory => _chatHistory;

  // Initialize with API Key
  void init(String apiKey) {
    _model = GenerativeModel(
      model: 'gemini-2.0-flash-latest', 
      apiKey: apiKey,
    );
  }

  Future<String> sendMessage(String text) async {
    if (_model == null) return 'Error: AI not initialized. Please configure API Key.';
    
    _isLoading = true;
    notifyListeners();

    try {
      final chat = _model!.startChat(history: _chatHistory);
      final content = Content.text(text);
      
      final response = await chat.sendMessage(content);
      final responseText = response.text ?? 'No response generated.';

      _chatHistory.add(content);
      _chatHistory.add(Content.model([TextPart(responseText)]));

      _isLoading = false;
      notifyListeners();
      return responseText;
    } catch (e) {
      _isLoading = false;
      notifyListeners();
      return 'Error: $e';
    }
  }

  Future<String> generateCode(String prompt, String type) async {
     if (_model == null) return 'Error: AI not initialized.';
     
     final systemPrompt = '''
      You are an expert code generator for IAH Creations.
      Generate production-ready, clean, and well-documented code based on the user's description.
      Type: $type
      Description: $prompt
      Requirements: Use modern best practices, responsive design, add comments.
      Generate ONLY the code, no explanations.
     ''';

     // For single-shot generation
     try {
       final response = await _model!.generateContent([Content.text(systemPrompt)]);
       return response.text ?? 'Failed to generate code.';
     } catch (e) {
       return 'Error generating code: $e';
     }
  }
}
