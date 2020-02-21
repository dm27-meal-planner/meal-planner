import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUser, registerUser} from '../../redux/reducers/userReducer';
import { Redirect } from 'react-router';
import './stylesheet/GuestLanding.css';

class GuestLanding extends Component{
    constructor(){
        super();

        this.state = {
            message: '',
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            password: '',
            passwordconfirm: '',
            household_size: 1,
        }
    }

    // reset message
    componentDidMount() {
        this.props.getUser();
    }

    handleUserInput = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleUserRegistration = async() => {
        //compare retype password to password of user
        const {first_name, last_name, username, email, password, passwordconfirm, household_size} = this.state;
        if (password === passwordconfirm) {
            this.setState({first_name: '', last_name: '', username: '', email: '', password: '', passwordconfirm: ''})
            await this.props.registerUser(username, password, email, first_name, last_name, household_size);
            this.props.getUser()

        } else {
            this.setState({message: "Passwords do not match."})
        }
    }
    render() {
        const familySize = [];
        for (let i = 1; i <= 10; i++) {
            familySize.push(i);
        } 

        if(this.props.user_id){
            return <Redirect to='/home'/>
        }

        return (
            <div id="GuestLanding">
                {/* {this.state.firebaseNewUser ?
                <>{this.setState({message: 'Almost done! We just need some extra information.'})}
                <div className = "names">
                    <input placeholder="First name" name="first_name" value={this.state.first_name} onChange={this.handleUserInput} />
                    <input placeholder="Last name" name="last_name" value={this.state.last_name} onChange={this.handleUserInput} />
                </div>
                <input placeholder="username" name="username" value={this.state.username} onChange={this.handleUserInput} />
                <div className = "household">
                    <h4>How many people you are cooking for. This can be changed later.</h4>
                    <select id="householdSizeSelect" onChange={e => {this.setState({household_size: e.target.value})}}>
                        {familySize.map((element, index) => {
                        return (
                            <option key={index} value={element}>{element}</option>
                        )
                    })}
                    </select>
                </div></>
                : <> */}
                <div className = "intro">
                    <div className="text-in-image">
                        <h1>Meal Thyme</h1>
                        <h2>Meal planning made simple.</h2>
                    </div>

                </div>
                <div className = "registerdetails">
                    <span>Register today. It's free.</span>
                    <div className = "names">
                        <input placeholder="First name" name="first_name" value={this.state.first_name} onChange={this.handleUserInput} />
                        <input placeholder="Last name" name="last_name" value={this.state.last_name} onChange={this.handleUserInput} />
                    </div>
                    <input placeholder="username" name="username" value={this.state.username} onChange={this.handleUserInput} />
                    <input placeholder="Email address" name="email" value={this.state.email} onChange={this.handleUserInput} />
                    <input placeholder="Password" name="password" type="password" value={this.state.password} onChange={this.handleUserInput} />
                    <input placeholder="Retype password" name="passwordconfirm" type="password" value={this.state.passwordconfirm} onChange={this.handleUserInput} />
                    <div className = "household">
                        <h4>Household Size:</h4>
                        <select id="householdSizeSelect" onChange={e => {this.setState({household_size: e.target.value})}}>
                            {familySize.map((element, index) => {
                                return(
                                    <option key={index} value={element}>{element}</option>
                                )
                            })}
                        </select>
                    </div>
                    {/* </>} */}
                    <button className="register" onClick={this.handleUserRegistration}>Register</button>
                    {this.state.message}
                    <p>Or sign in with Google.</p>
                </div>
            </div>
        )
    }
}

// this page should not appear if the user is logged in
const mapStateToProps = reduxState => {
    return {
        user_id: reduxState.user.user_id,
        message: reduxState.user.message,
        firebase: reduxState.firebase
    }
}

//login user and logout user are located in the navigation component; not needed here
export default connect(mapStateToProps, {getUser, registerUser})(GuestLanding)