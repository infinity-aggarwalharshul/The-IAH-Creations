import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart' show defaultTargetPlatform, kIsWeb, TargetPlatform;

class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      case TargetPlatform.macOS:
        return macos;
      case TargetPlatform.windows:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for windows - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      case TargetPlatform.linux:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for linux - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      default:
        throw UnsupportedError(
          'DefaultFirebaseOptions are not supported for this platform.',
        );
    }
  }

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    appId: '1:123456789:web:xxxxxxxxxxxxxxxxxx',
    messagingSenderId: '123456789',
    projectId: 'iah-creations-app',
    authDomain: 'iah-creations-app.firebaseapp.com',
    storageBucket: 'iah-creations-app.appspot.com',
    measurementId: 'G-XXXXXXXXXX',
  );

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    appId: '1:123456789:android:xxxxxxxxxxxxxxxxxx',
    messagingSenderId: '123456789',
    projectId: 'iah-creations-app',
    storageBucket: 'iah-creations-app.appspot.com',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    appId: '1:123456789:ios:xxxxxxxxxxxxxxxxxx',
    messagingSenderId: '123456789',
    projectId: 'iah-creations-app',
    storageBucket: 'iah-creations-app.appspot.com',
    iosBundleId: 'com.iahcreations.app',
  );

  static const FirebaseOptions macos = FirebaseOptions(
    apiKey: 'AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    appId: '1:123456789:ios:xxxxxxxxxxxxxxxxxx',
    messagingSenderId: '123456789',
    projectId: 'iah-creations-app',
    storageBucket: 'iah-creations-app.appspot.com',
    iosBundleId: 'com.iahcreations.app',
  );
}