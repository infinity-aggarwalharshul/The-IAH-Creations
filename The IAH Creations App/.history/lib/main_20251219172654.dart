import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_analytics/firebase_analytics.dart';
import 'package:firebase_crashlytics/firebase_crashlytics.dart';
import 'firebase_options.dart';
import 'screens/home_screen.dart';
import 'utils/theme.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  
  FlutterError.onError = FirebaseCrashlytics.instance.recordFlutterFatalError;
  
  runApp(const IAHCreationsApp());
}

class IAHCreationsApp extends StatelessWidget {
  const IAHCreationsApp({super.key});

  static FirebaseAnalytics analytics = FirebaseAnalytics.instance;
  static FirebaseAnalyticsObserver observer = FirebaseAnalyticsObserver(analytics: analytics);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'The IAH Creations',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.darkTheme,
      navigatorObservers: [observer],
      home: const HomeScreen(),
    );
  }
}