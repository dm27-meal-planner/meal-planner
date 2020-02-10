import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUser, loginUser, logoutUser} from '../../redux/reducers/userReducer';

class UserLoginLogout extends Component {
   constructor() {
      super();

      this.state = {
         userOrEmail: '',
         password: ''
      }
   }

   componentDidMount() {
      this.props.getUser();
   }

   handleUserInput(value) {
      this.setState({userOrEmail: value});
   }

   handlePasswordInput(value) {
      this.setState({password: value});
   }

   render() {
      const {userOrEmail, password} = this.state;
      return(
         <div id="UserLoginLogout">
            <h1>Login</h1>
            <input placeholder="Name/Email"
            value={userOrEmail}
            id="userInput"
            onChange={e => this.handleUserInput(e.target.value)}/>
            <input placeholder="Password" 
            value={password}
            type="password"
            id="passwordInput"
            onChange={e => this.handlePasswordInput(e.target.value)}/>
            <button onClick={() => {
               this.props.loginUser(userOrEmail, password)
               this.setState({userOrEmail: '', password: ''})
            }}>Log in</button>

            {this.props.username ? 
            <>
               <h1>Welcome, {this.props.username}!</h1> 
               <button onClick={() => {
                  this.props.logoutUser();
               }}>Logout</button>
            </>
            : null}
         </div>
      )
   }
}

const mapStateToProps = reduxState => {
   return {
      username: reduxState.user.username,
      email: reduxState.user.email,
      household_size: reduxState.user.household_size,
      message: reduxState.user.message
   }
}

export default connect(mapStateToProps, {getUser, loginUser, logoutUser})(UserLoginLogout)