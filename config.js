// Firebase Configuration - Secure Implementation
// This file handles environment-based configuration

const getFirebaseConfig = () => {
  const hostname = window.location.hostname;
  // For all deployed environments
  if (hostname.includes('firebaseapp.com') || 
      hostname.includes('web.app') ||
      hostname === 'iahcreations.com' ||
      hostname.includes('github.io') ||
      hostname.includes('pages.dev') ||
      hostname.includes('netlify.app') ||
      hostname.includes('vercel.app')) {
    return {
      apiKey: "AIzaSyDqG9f8LZOMjgYp1gA1hf5yRcjvYzSbWuw",
      authDomain: "the-iah-creationgit-1741-47b3f.firebaseapp.com",
      projectId: "the-iah-creationgit-1741-47b3f",
      storageBucket: "the-iah-creationgit-1741-47b3f.firebasestorage.app",
      messagingSenderId: "113120495542",
      appId: "1:113120495542:web:65602865e6c25596832317",
      measurementId: "G-YV5LF87RD5"
    };
  }
  
  // For local development - use demo config
  return {
    apiKey: "demo-api-key",
    authDomain: "demo.firebaseapp.com",
    projectId: "demo-project",
    storageBucket: "demo.appspot.com",
    messagingSenderId: "000000000000",
    appId: "demo:app:id",
    measurementId: "G-DEMO"
  };
};

window.getFirebaseConfig = getFirebaseConfig;