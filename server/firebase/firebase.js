// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";
require('dotenv').config();

// Add the Firebase services that you want to use
// We only want to use Firebase Auth here
import "firebase/auth";

const {FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_DATABASE_URL, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID} = process.env;

// Your app's Firebase configuration
var firebaseConfig = {
   apiKey: FIREBASE_API_KEY,
   authDomain: FIREBASE_AUTH_DOMAIN,
   databaseURL: FIREBASE_DATABASE_URL,
   projectId: FIREBASE_PROJECT_ID,
   storageBucket: FIREBASE_STORAGE_BUCKET,
   messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
   appId: FIREBASE_APP_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Finally, export it to use it throughout your app
export default firebase;