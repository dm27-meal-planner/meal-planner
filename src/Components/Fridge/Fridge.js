import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import FridgeItem from './FridgeItem';
import moment from 'moment';
import {Popconfirm, Button } from 'antd';
import {getUserFridge, emptyFridge, deleteItem} from '../../redux/reducers/fridgeReducer';
import {getUser} from '../../redux/reducers/userReducer';
import loading from '../../animations/loading.gif'
import './stylesheet/Fridge.css';

class Fridge extends Component{
    constructor() {
        super();

        this.state = {
            searchName: '',
            loading: true
        }
        this.updateFridge=this.updateFridge.bind(this);
        this.deleteItem=this.deleteItem.bind(this);
    }

    componentDidMount = () => {
        console.log(this.props.user_id)
        if(this.props.user_id === null){
            return null;
        } else {
             this.updateFridge();

             this.props.fridge.forEach(ele => {
                 if(moment().format('DDD') > moment(ele.meal_date).format('DDD')){
                    this.props.deleteItem(this.props.user_id, ele.fridge_item_id)
                 }
                })
        }
    }

    updateFridge() {
        this.props.getUserFridge(this.props.user_id);
        this.setState({loading: false})
    }

    deleteItem = (id) => {
        this.props.deleteItem(this.props.user_id, id);
    }

    editItem = async (id, element) => {
        
    }

    emptyFridge = () => {
        this.props.emptyFridge(this.props.user_id);
    }

    handleUserChange = (e) => {
        this.setState({searchName: e.target.value});
    }

    render(){
        if (this.props.user_id === null) {
            return <Redirect to='/' />
        } else if(this.state.loading){
            return <img scr={loading} alt='loading'/>
        }else{
            return (
                <div id="Fridge">
                    <h1>Your Fridge</h1>
                    <form>
                        <input className="searchName" name="searchName" placeholder="Search by name" value={this.state.searchName} onChange={this.handleUserChange} />
                        <Link className="fridgeadd" to='/grocerylist'>Add More Ingredients</Link>
                    </form>
                    {this.props.fridge[0] ?
                    <div id="fridgeHasStuff"> 
                        <table className="fridgeTable">
                            <thead>
                                <tr className="topper">
                                    <th>All Items</th>
                                    <th>Added</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.fridge.map((element, index) => {
                                    return (
                                        // To-do: User can alter quantities in the fridge.
                                        <FridgeItem 
                                        key={index}
                                        element={element} 
                                        updateFridge={this.updateFridge}
                                        deleteItem={this.deleteItem}/>
                                    )
                                })}
                            </tbody>
                        </table>
                    <Popconfirm placement="top" title="Are you sure you want to delete all the items in the fridge?" onConfirm={this.emptyFridge} okText="Delete" cancelText="No">
                        <Button>Empty Fridge</Button>
                    </Popconfirm>
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

export default connect(mapStateToProps, {getUserFridge, getUser, emptyFridge, deleteItem})(Fridge) 