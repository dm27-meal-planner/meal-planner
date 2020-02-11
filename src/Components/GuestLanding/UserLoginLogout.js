import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUser, loginUser, logoutUser, registerFirebase, loginFirebase} from '../../redux/reducers/userReducer';
import { withRouter } from 'react-router';
import Firebase from '../Firebase/Firebase';

class UserLoginLogout extends Component {
   constructor() {
      super();

      this.state = {
         userOrEmail: '',
         password: '',
         renderAmount: 0
      }
   }

   componentDidMount() {
      this.props.getUser();

      // const {registerFirebase, loginFirebase} = this.props

      // var firebaseConfig = {
      //    apiKey: REACT_APP_FIREBASE_API_KEY,
      //    authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
      //    databaseURL: REACT_APP_FIREBASE_DATABASE_URL,
      //    projectId: REACT_APP_FIREBASE_PROJECT_ID,
      //    storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
      //    messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      //    appId: REACT_APP_FIREBASE_APP_ID
      // };

      // if (!firebase.apps.length) {
      //    firebase.initializeApp(firebaseConfig);
      // }

      // new firebaseui.auth.AuthUI(firebase.auth()).start('#firebaseui-auth-container', {
      //    // props: this.props,
      //    signInOptions: [
      //       // List of OAuth providers supported.
      //       firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      //       firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      //       firebase.auth.TwitterAuthProvider.PROVIDER_ID
      //    ], callbacks: {
      //       signInSuccessWithAuthResult: function(authResult, redirectURL) {
      //          console.log(authResult);
      //          console.log(registerFirebase)
      //          // props are undefined.........................
      //          if (authResult.additionalUserInfo.isNewUser) {
      //             registerFirebase(authResult.user.displayName, authResult.user.email, authResult.additionalUserInfo.profile.id)
      //          } else {
      //             loginFirebase(authResult.additionalUserInfo.profile.id)
      //          }
      //          // Alter reduxState; anyone who signs in via this method no longer needs
      //          // to enter their password, BUT I still need them to fill out the rest of their info
      //          return false;
      //       }
      //    }
      // })
   }

   handleUserInput = (value) => {
      this.setState({userOrEmail: value});
   }

   handlePasswordInput = (value) => {
      this.setState({password: value});
   }

   render() {
      const {userOrEmail, password} = this.state;

      if(this.props.user_id){
         return (
            <>
               <h1>Welcome, {this.props.username}!</h1> 
               <button onClick={() => {
                  this.props.logoutUser();
               }}>Logout</button>
            </>
         )
      }

      return(
         <div id="UserLoginLogout">
            <h1>Login</h1>
            <form onSubmit={() => {
               this.props.loginUser(userOrEmail, password)
               this.setState({userOrEmail: '', password: ''})
            }}>
               <input placeholder="Name/Email"
                  value={userOrEmail}
                  id="userInput"
                  required
                  onChange={e => this.handleUserInput(e.target.value)}/>
               <input placeholder="Password" 
                  value={password}
                  type="password"
                  id="passwordInput"
                  required
                  onChange={e => this.handlePasswordInput(e.target.value)}/>
               <input type="submit" />
            </form>

            {this.props.history.action === "REPLACE" ? <p>You must be logged in to access that page</p> : null}
            {this.props.username ? 
            <>
               <h1>Welcome, {this.props.username}!</h1> 
               <button onClick={() => {
                  this.props.logoutUser();
               }}>Logout</button>
            </> : <Firebase />}
             {/* : <div className="medialogin">
                <div id="firebaseui-auth-container"></div>
             </div>} */}
         </div>
      )
   }
}

const mapStateToProps = reduxState => {
   return {
      user_id: reduxState.user.user_id,
      username: reduxState.user.username,
      email: reduxState.user.email,
      household_size: reduxState.user.household_size,
      message: reduxState.user.message
   }
}

export default withRouter(connect(mapStateToProps, {getUser, loginUser, logoutUser, registerFirebase, loginFirebase})(UserLoginLogout))