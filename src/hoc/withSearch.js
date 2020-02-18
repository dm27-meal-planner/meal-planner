import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRecipeByQuery } from '../redux/reducers/recipeReducer';
import { saveSearchCondition } from '../redux/reducers/recipeSearchReducer';
import axios from 'axios';



function withSearch(BaseComponent, searchBtnCb) {
    // BaseComponent can display the result of search
    // searchBtnCb is the function will be invoked after press search button, 
    //  the purpose of cb is to redirect to certain page.

    class HOComponent extends Component {
        constructor() {
            super();
            this.state = {
                browseWindowFlag: false,
                name: '',
                page: 1,
                mealType: '',
                cuisine: '',
                cuisineList: [],
                ingredient: '',
            }
            this.handleInputChange = this.handleInputChange.bind(this);
        }

        componentDidMount() {
            this.setLocalStateToProps();
            axios.get('/api/recipe/cuisinelist').then(response=>{
                this.setState({
                    cuisineList: response.data,
                })
            })
        }

        setLocalStateToProps = () => {
            this.setState({
                name: this.props.name,
                page: this.props.page,
                mealType: this.props.mealType,
                cuisine: this.props.cuisine,
                ingredient: this.props.ingredient,
            })
        }

        handleInputChange(e) {
            this.setState({
                [e.target.name]: e.target.value
            });
        }

        handleWindow = (window) => {
            this.setState({
                [window]: !this.state[window]
            });
        }

        searchRecipes = () => {
            // save search condition
            this.props.saveSearchCondition({
                name: this.state.name,
                page: this.state.page,
                mealType: this.state.mealType,
                cuisine: this.state.cuisine,
                ingredient: this.state.ingredient,
            });
            // send info to redux.
            if (this.state.name) {
                let params = `name=${this.state.name}&page=${this.state.page}`;
                params += `meal_type=${this.state.mealType}&cuisine=${this.state.cuisine}`;
                params += `ingredient=${this.state.ingredient}`;
                this.props.getRecipeByQuery(params);
            }
            

            // after press search btn, exe the callback function
            // (mainly for redirect to certain page.)
            searchBtnCb();
        }

        handlePageChange = (iter) => {
            if (this.state.page + iter !== 0) {
                // switch page
                this.setState({
                    page: this.state.page + iter
                }, () => {
                    this.searchRecipes();
                });
            }
        }

        render() {
            // need to check what kind of type search.
            const browseWindow = this.state.browseWindowFlag ? (<ul>
                <li>
                    <span>Meal Type:</span>
                    <select name='mealType' onChange={this.handleInputChange} value={this.state.mealType}>
                        <option value=''>Select Meal Type</option>
                        <option value='breakfast'>Breakfast</option>
                        <option value='lunch'>Lunch</option>
                        <option value='dinner'>Dinner</option>
                    </select>
                </li>
                <li>
                    <span>Cuisine: </span>
                    <select name='cuisine' onChange={this.handleInputChange} value={this.state.cuisine}>
                        <option value=''>Select Cuisine</option>
                        {this.state.cuisineList.map((ele, i) => <option value={ele.cuisine_name.toLowerCase()} key={ele.cuisine_id} >{ele.cuisine_name}</option>)}
                    </select>
                </li>
                <li>
                    <span>Ingredient: </span>
                    <input name='ingredient' onChange={this.handleInputChange} placeholder='type ingredient here'  value={this.state.ingredient}/>    
                </li>
            </ul>) : null;

            return (
                <div>
                    <div>
                        {/* showing category window */}
                        <button onClick={() => { this.handleWindow('browseWindowFlag') }}>Browse</button>
                        {browseWindow}
                        <input onChange={this.handleInputChange} value={this.state.name} name='name' />
                        <button onClick={this.searchRecipes}>Search</button>
                    </div>
                    <div>
                        <button onClick={() => { this.handlePageChange(-1) }}>Previous page</button>
                        {this.props.name ? (<span>Current Page: {this.state.page} </span>) : null}
                        <button onClick={() => { this.handlePageChange(1) }}>Next page</button>
                    </div>
                    {/* BaseComponent getting the search result from redux */}
                    <BaseComponent />
                </div>
            )
        }
    }

    const mapStateToProps = function (reduxState) {
        return {
            name: reduxState.recipeSearch.name,
            page: reduxState.recipeSearch.page,
            mealType: reduxState.recipeSearch.mealType,
            cuisine: reduxState.recipeSearch.cuisine,
            ingredient: reduxState.recipeSearch.ingredient,
        }
    }

    return connect(mapStateToProps, { getRecipeByQuery, saveSearchCondition })(HOComponent)
}


export default withSearch;