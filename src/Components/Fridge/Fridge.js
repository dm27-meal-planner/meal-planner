import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import {getUserFridge} from '../../redux/reducers/fridgeReducer';
import {getUser} from '../../redux/reducers/userReducer';

class Fridge extends Component{
    constructor() {
        super();

        this.state = {

        }
        this.updateFridge=this.updateFridge.bind(this);
    }

    componentDidMount() {
        this.props.getUser();
        if(this.props.user_id === null){
            return null;
        } else {
            this.updateFridge();
        } 
    }

    updateFridge() {
        this.props.getUserFridge(this.props.user_id);
    }

    render(){
        if (this.props.user_id === null) {
            return <Redirect to='/' />
        } else {
            return (
                <div>
                    <h1>{this.props.username}'s Fridge</h1>
                    {this.props.fridge !== null ? 
                    this.props.fridge.map((element, index) => {
                        return (
                            <div key={index}>
                                
                            </div>
                        )
                    })
                    : <>Nothing here... You can record stuff in your fridge manually as well!</>}
                </div>
            )
        }
    }
}

const mapStateToProps = (reduxState) => {
    return {
        user_id: reduxState.user.user_id,
        username: reduxState.user.username,
        fridge: reduxState.fridge.ingredients       
    }
}

export default connect(mapStateToProps, {getUserFridge, getUser})(Fridge) 