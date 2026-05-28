import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../utils/constants.dart';

class FirebaseService {
  static final FirebaseService _instance = FirebaseService._internal();
  factory FirebaseService() => _instance;
  FirebaseService._internal();

  final FirebaseAuth _auth = FirebaseAuth.instance;
  final FirebaseFirestore _db = FirebaseFirestore.instance;

  FirebaseAuth get auth => _auth;
  FirebaseFirestore get db => _db;

  // Initialize with specific options if needed, but usually auto-init via google-services.json is best for mobile
  // For web or specific handling we can use the ID/Number
  Future<void> initialize() async {
    try {
      // Check if already initialized to avoid duplicate init errors
      if (Firebase.apps.isEmpty) {
        // For Android/iOS, it reads from google-services.json / GoogleService-Info.plist
        // If we needed to manually configure:
        /*
        await Firebase.initializeApp(
          options: FirebaseOptions(
            apiKey: 'CURRENTLY_MISSING', 
            appId: 'com.iahcreations.app', 
            messagingSenderId: AppConstants.firebaseProjectNumber, 
            projectId: AppConstants.firebaseProjectId,
          ),
        );
        */
        await Firebase.initializeApp();
      }
    } catch (e) {
      print('Firebase Init Error: $e');
    }
  }

  // Example Auth method
  Future<User?> signInAnonymously() async {
    try {
      final userCredential = await _auth.signInAnonymously();
      return userCredential.user;
    } catch (e) {
      print('Sign in error: $e');
      return null;
    }
  }
}
