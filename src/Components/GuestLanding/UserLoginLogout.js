import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUser, loginUser, logoutUser, registerFirebase, loginFirebase} from '../../redux/reducers/userReducer';
import { withRouter } from 'react-router';
import Firebase from '../Firebase/Firebase';
import {Popover} from 'antd';
import '../NavBar/style/NavBar.css';

class UserLoginLogout extends Component {
   constructor() {
      super();

      this.state = {
         userOrEmail: '',
         password: '',
         visible: false
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

   handleVisibleChange = visible => {
      this.setState({visible});
   }

   render() {
      const {userOrEmail, password} = this.state;

      if(this.props.user_id){
         return (
            <>
               <p>Welcome, {this.props.username}!</p> 
               <button onClick={() => {
                  this.props.logoutUser();
               }}>Logout</button>
            </>
         )
      }

      return(
         <div id="UserLoginLogout">
            <Popover
               content={<form className="user" onSubmit={() => {
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
            </form>}
            placement="bottomLeft"
            trigger="click"
            visible={this.state.visible}
            onVisibleChange={this.handleVisibleChange}>
               <p type="primary">Login</p>
            </Popover>
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