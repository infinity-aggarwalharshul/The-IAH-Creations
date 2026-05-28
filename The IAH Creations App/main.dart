import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';
import 'utils/constants.dart';
import 'services/ai_service.dart';
import 'screens/home_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  // await Firebase.initializeApp(); // Uncomment when google-services.json is present

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AIService()),
      ],
      child: MaterialApp(
        title: AppConstants.appName,
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          brightness: Brightness.dark,
          primaryColor: AppConstants.primaryColor,
          scaffoldBackgroundColor: AppConstants.backgroundColor,
          textTheme: GoogleFonts.interTextTheme(ThemeData.dark().textTheme),
          useMaterial3: true,
        ),
        home: HomeScreen(),
      ),
    );
  }
}