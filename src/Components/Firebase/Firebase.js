import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';
import {registerFirebase, loginFirebase} from '../../redux/reducers/userReducer';
import './Firebase.css';

const {REACT_APP_FIREBASE_API_KEY, REACT_APP_FIREBASE_AUTH_DOMAIN, REACT_APP_FIREBASE_DATABASE_URL, REACT_APP_FIREBASE_PROJECT_ID, REACT_APP_FIREBASE_STORAGE_BUCKET, REACT_APP_FIREBASE_MESSAGING_SENDER_ID, REACT_APP_FIREBASE_APP_ID} = process.env;

class Firebase extends Component {
   constructor() {
      super();
      
      this.state = {}
   }

   render() {
      const {registerFirebase, loginFirebase} = this.props
      var firebaseConfig = {
         apiKey: REACT_APP_FIREBASE_API_KEY,
         authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
         databaseURL: REACT_APP_FIREBASE_DATABASE_URL,
         projectId: REACT_APP_FIREBASE_PROJECT_ID,
         storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
         messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
         appId: REACT_APP_FIREBASE_APP_ID
      };

      if (!firebase.apps.length) {
         firebase.initializeApp(firebaseConfig);
      }
      new firebaseui.auth.AuthUI(firebase.auth()).start('#firebaseui-auth-container', {
   signInOptions: [
      // Facebook and Twitter do not work for now. Will work on this later.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID
   ], callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectURL) {
         console.log(authResult);
         console.log(registerFirebase)
         // props are undefined.........................
         if (authResult.additionalUserInfo.isNewUser) {
            registerFirebase(authResult.user.displayName, authResult.user.email, authResult.additionalUserInfo.profile.id)
         } else {
            loginFirebase(authResult.additionalUserInfo.profile.id)
         }
         return false;
      }
   }
})
      return(
         <>
            <div id="firebaseui-auth-container"></div>
         </>
      )
   }
}

export default connect(undefined, {loginFirebase, registerFirebase})(Firebase)