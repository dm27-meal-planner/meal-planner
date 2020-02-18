import React, { Component } from 'react';
import axios from 'axios'
import SearchItem from '../../../GroceryList/SearchItem';
import ListItem from '../../../GroceryList/ListItem';

class RecipeIngredientCard extends Component {
    constructor() {
        super();
        this.state = {
            searchInput: '',
            searchResults: [],
            // **  using props list instead.
            list: [],
            editMode: false,
        }
    }

    componentDidMount() {
        // 
    }

    getSearchResults = () => {
        axios.post('/api/ingredient/search', { searchPhrase: this.state.searchInput })
            .then(res => {
                this.setState({
                    searchResults: res.data
                })
            })
            .catch(err => console.log(err.response.data))
    }


    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        let searchResults = this.state.searchResults.map((ele, i) => {
            return (
                <SearchItem name={ele.name} image={ele.image} 
                possibleUnits={ele.possibleUnits} addToList={this.props.addToIngredients} 
                id={ele.id} key={i} />
            )
        })
        let list = this.props.ingredients.map((ele, i) => {
            return (
                <ListItem name={ele.name} image={ele.image} 
                amount={ele.amount} unit={ele.unit}  
                i={i} key={i} 
                saveChanges={this.props.changeIngredient} 
                removeItem={this.props.removeIngredient} />
            )
        })
        return (
            <div>
                <span>Search the ingredients:</span>
                <ul>
                    {searchResults}
                </ul>
                <input name='searchInput' onChange={this.handleInputChange} />
                <button onClick={this.getSearchResults}>search</button>
                <ul>
                    {list}
                </ul>

                <div className="closeWindowBtn">
                    {/* close window btn */}
                    <button onClick={() => {}}>Close</button>
                </div>

            </div>
        )
    }
}
export default RecipeIngredientCard;