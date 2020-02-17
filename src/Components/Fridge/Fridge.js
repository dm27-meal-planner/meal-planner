import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import FridgeItem from './FridgeItem';
import {getUserFridge, emptyFridge, deleteItem} from '../../redux/reducers/fridgeReducer';
import {getUser} from '../../redux/reducers/userReducer';

class Fridge extends Component{
    constructor() {
        super();

        this.state = {

        }
        this.updateFridge=this.updateFridge.bind(this);
        this.deleteItem=this.deleteItem.bind(this);
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

    deleteItem = async (id) => {
        await this.props.deleteItem(this.props.user_id, id);
        this.updateFridge();
    }

    editItem = async (id, element) => {
        
    }

    render(){
        if (this.props.user_id === null) {
            return <Redirect to='/' />
        } else {
            return (
                <div>
                    <h1>{this.props.username}'s Fridge</h1>
                    {this.props.fridge[0] ?
                    <div id="fridgeHasStuff"> 
                    {this.props.fridge.map((element, index) => {
                        return (
                            // If there's a spoon_id, perform an API search.
                            <div key={index} id='fridgeItem'>
                                <FridgeItem element={element} 
                                updateFridge={this.updateFridge}
                                deleteItem={this.deleteItem}/>
                            </div>
                        )
                    })}<button onClick={() => {
                        this.props.emptyFridge(this.props.user_id);
                        this.updateFridge();
                    }}>Empty Fridge</button>
                    </div>
                    : <>Nothing here... Add items via Grocery List or manually!</>}
                    <Link to='/grocerylist'>Add More Ingredients</Link>
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

export default connect(mapStateToProps, {getUserFridge, getUser, emptyFridge, deleteItem})(Fridge) 