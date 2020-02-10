// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
// We only want to use Firebase Auth here
import "firebase/auth";

// Your app's Firebase configuration
var firebaseConfig = {
   apiKey: "AIzaSyDWcEDSNOv7ICeM19lQTglBrkDt4SxplSs",
   authDomain: "mealplan-ba9b9.firebaseapp.com",
   databaseURL: "https://mealplan-ba9b9.firebaseio.com",
   projectId: "mealplan-ba9b9",
   storageBucket: "mealplan-ba9b9.appspot.com",
   messagingSenderId: "559367326575",
   appId: "1:559367326575:web:4c7a9b33b190a87a89f69a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Finally, export it to use it throughout your app
export default firebase;