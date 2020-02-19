import React, {Component} from 'react';
import axios from 'axios'
import SearchItem from './SearchItem';
import ListItem from './ListItem';
import ShoppingList from './ShoppingList';
import {addItem} from '../../redux/reducers/fridgeReducer';
import {getUserGroceryList, addItemToList, deleteGroceryItem} from '../../redux/reducers/grocerylistReducer';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class GroceryList extends Component{
    constructor(){
        super();
        this.state = {
            searchInput: '',
            searchResults: [],
            list: [],
            editMode: false,
        }
    }
    componentDidMount = async () => {
        await this.props.getUserGroceryList(this.props.user_id);
    }

    componentDidUpdate = async (prevProps) => {
        if (this.props.groceryList.length !== prevProps.groceryList.length) {
            await this.props.getUserGroceryList(this.props.user_id);
        }else{
            return false
        }
    }
    getSearchResults = () => {
         axios.post('/api/ingredient/search', {searchPhrase: this.state.searchInput})
                .then(res => {
                    this.setState({
                        searchResults: res.data
                    })
                })
                .catch(err => console.log(err.response.data))
    }

    addToList = async(ingredient) => {
        let price = await axios.post('/api/ingredient/price', {id: ingredient.id, amount: ingredient.amount, unit:ingredient.unit})
                .then(res => res.data)   
        this.setState({
            list: [...this.state.list, {...ingredient, price: price}]
        })
    }
    
    removeItem = (i) => {
        let list = this.state.list.slice()

        list.splice(i, 1)

        this.setState({
            list : list 
        })
    }

    saveChanges = (i, amount) => {
        let list = this.state.list.slice(i)

        list.splice(i, 1, {...this.state.list[i], amount: amount})

        this.setState({
            list: list
        })
    }

    handleInputChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value 
      })
    }

    localToDatabase = (grocerylist) => {
        this.props.addItemToList(this.props.user_id, grocerylist);
        this.setState({list: []});
    }

    render(){
        if(!this.props.user_id){
            return <Redirect to='/' />
        }

        let searchResults = this.state.searchResults.map((ele, i) => {
            return(
                <SearchItem name={ele.name} image={ele.image} possibleUnits={ele.possibleUnits} addToList={this.addToList} id={ele.id} key={i} />
            )
        })
        let list = this.state.list.map((ele, i) => {
            return (
                <ListItem name={ele.name} image={ele.image} amount={ele.amount} unit={ele.unit} price={ele.price} i={i} key={i} saveChanges={this.saveChanges} removeItem={this.removeItem}/>
            )
        })
        return (
            <div>
                <ul>
                    {searchResults}
                </ul>
                GroceryList
                <input name='searchInput' onChange={this.handleInputChange}/> 
                <button onClick={this.getSearchResults}>search</button>
                <ul>
                    {list}
                </ul>
                {list[0] ? 
                <div className="addToListDatabase">
                    <button onClick={() => this.localToDatabase(this.state.list)}>Add items to list</button>
                </div>
                : null}
                <h1>My Shopping List</h1>
                {/* So shopping list and items to add to the list are separate. */}
                {this.props.groceryList[0] ? 
                <div id="groceryList">
                    <ShoppingList user_id={this.props.user_id} groceryList={this.props.groceryList} />
                </div>
                : <p>Your shopping list is empty!</p>}
            </div>
        )
    } 
}

const mapStateToProps = (reduxState) => {
    return {
        user_id: reduxState.user.user_id,
        groceryList: reduxState.grocerylist.ingredients  
    }
}

export default connect(mapStateToProps, 
{getUserGroceryList, addItemToList, addItem, deleteGroceryItem})
(GroceryList)