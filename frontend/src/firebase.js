import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "greenstep-demo.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "greenstep-demo",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "greenstep-demo.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef",
};

let app = null;
let auth = null;
let db = null;
let storage = null;
let googleProvider = null;

const isConfigured = firebaseConfig.apiKey !== "demo-api-key" && !!firebaseConfig.apiKey;

if (isConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    googleProvider = new GoogleAuthProvider();
  } catch (e) {
    console.warn("Firebase init failed:", e.message);
  }
}

export { app, auth, db, storage, googleProvider, isConfigured };
export default firebaseConfig;
