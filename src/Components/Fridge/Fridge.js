import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import {getUserFridge} from '../../redux/reducers/fridgeReducer';

class Fridge extends Component{
    constructor(){
        super();
    }

    render(){

        if(!this.props.user_id){
            return <Redirect to='/' />
        } else {
            this.props.getUserFridge(this.props.user_id);
        } 
        
        return (
            <div>
                <h1></h1>
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

export default connect(mapStateToProps, {getUserFridge})(Fridge) 