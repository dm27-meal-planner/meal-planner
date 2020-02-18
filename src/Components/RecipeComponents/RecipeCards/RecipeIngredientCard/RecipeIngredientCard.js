import React, { Component } from 'react';
import axios from 'axios'
import IngredientSearchCard from '../../RecipeCards/IngredientSearchCard/IngredientSearchCard';
import IngredientListCard from '../../RecipeCards/IngredientListCard/IngredientListCard';
import IngredientInputCard from '../IngredientInputCard/IngredientInputCard';

class RecipeIngredientCard extends Component {
    constructor() {
        super();
        this.state = {
            searchInput: '',
            searchResults: [],
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
            .catch(err => {
                console.log(err.response.data);
                alert('Search function currently not working. You may try it tomorrow.');
            })
    }


    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        let searchResults = this.state.searchResults.map((ele, i) => {
            return (
                <IngredientSearchCard name={ele.name} image={ele.image} 
                possibleUnits={ele.possibleUnits} addToList={this.props.addToIngredients} 
                id={ele.id} key={i} />
            )
        })
        let list = this.props.ingredients.map((ele, i) => {
            return (
                <IngredientListCard name={ele.name} amount={ele.amount} 
                unit={ele.unit}  i={i} key={i} 
                saveChanges={this.props.changeIngredient} 
                removeItem={this.props.removeIngredient} />
            )
        })
        return (
            <div>
                <section>
                    <span>Search the ingredients to add to the recipe:</span>
                    <input name='searchInput' onChange={this.handleInputChange} />
                    <button onClick={this.getSearchResults}>search</button>
                    <ul>
                        {searchResults}
                    </ul>
                </section>
                <section>
                    <span>Or enter customize ingredients:</span>
                    <IngredientInputCard 
                    addToIngredients={this.props.addToIngredients}
                    />
                </section>
                <section>
                    <span>The ingredients will be used in the recipe:</span>
                    <ul>
                        {list}
                    </ul>
                </section>
                <div className="closeWindowBtn">
                    {/* close window btn */}
                    <button onClick={this.props.closeWindow}>Close</button>
                </div>
            </div>
        )
    }
}
export default RecipeIngredientCard;