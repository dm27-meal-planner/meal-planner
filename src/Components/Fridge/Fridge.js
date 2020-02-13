import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import {getUserFridge, emptyFridge} from '../../redux/reducers/fridgeReducer';
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
            // check if user has a fridge or not; if they somehow do not,
            // create one before returning anything
            return (
                <div>
                    <h1>{this.props.username}'s Fridge</h1>
                    {this.props.fridge[0] ?
                    <div id="fridgeHasStuff"> 
                    {this.props.fridge.map((element, index) => {
                        return (
                            // If there's a spoon_id, perform an API search.
                            <div key={index}>
                                {element.ingredient_name}
                                {element.quantity}
                                {element.date_added}
                                {element.unit}
                            </div>
                        )
                    })}<button onClick={() => {
                        this.props.emptyFridge(this.props.user_id);
                        this.updateFridge();
                    }}>Empty Fridge</button>
                    </div>
                    : <>Nothing here... Add items via Grocery List or manually!</>}
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

export default connect(mapStateToProps, {getUserFridge, getUser, emptyFridge})(Fridge) 