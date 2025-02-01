import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyB8i-6m8kDH9yCZ8Jm7xqJjyr1Qlh6aLTM",
  authDomain: "bluff-game-435ba.firebaseapp.com",
  projectId: "bluff-game-435ba",
  storageBucket: "bluff-game-435ba.firebasestorage.app",
  messagingSenderId: "717389137270",
  appId: "1:717389137270:web:1d88a463442a8ef22c6657",
  measurementId: "G-HW1VFYE255",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

// const analytics = window? getAnalytics(app): null;

export { auth, signInWithPopup, signInAnonymously };
