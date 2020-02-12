import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import {getUserFridge} from '../../redux/reducers/fridgeReducer';
import {getUser} from '../../redux/reducers/userReducer';

class Fridge extends Component{
    componentDidMount() {
        this.props.getUser();
        if(!this.props.user_id){
            return <Redirect to='/' />
        } else {
            this.props.getUserFridge(this.props.user_id);
        } 
    }

    render(){
        
        return (
            <div>
                <h1>{this.props.username}'s Fridge</h1>
                
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        user_id: reduxState.user.user_id,
        username: reduxState.user.username       
    }
}

export default connect(mapStateToProps, {getUserFridge, getUser})(Fridge) 