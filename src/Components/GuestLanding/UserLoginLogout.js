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