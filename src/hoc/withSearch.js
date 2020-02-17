import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRecipeByQuery } from '../redux/reducers/recipeReducer';
import { saveSearchCondition } from '../redux/reducers/recipeSearchReducer';


function withSearch(BaseComponent, searchBtnCb) {
    // BaseComponent can display the result of search
    // searchBtnCb is the function will be invoked after press search button, 
    //  the purpose of cb is to redirect to certain page.

    class HOComponent extends Component {
        constructor() {
            super();
            this.state = {
                browseWindow: false,
                name: '',
                page: 1,
                mealType: '',
                cuisine: '',
                ingredient: '',
            }
            this.handleInputChange = this.handleInputChange.bind(this);
        }

        componentDidMount(){
            this.setLocalStateToProps();
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
                name: e.target.value
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
                let params = `name=${this.state.name}&page=${this.state.page}`
                this.props.getRecipeByQuery(params);
            }
            // ** working: category search.

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
            const browseWindow = this.state.browseWindow ? (<ul>
                <li>Meal Type</li>
                {/* <li>Dish Type</li> */}
                <li>Cuisine</li>
                <li>Ingredient</li>
            </ul>) : null;

            return (
                <div>
                    <div>
                        {/* showing category window */}
                        <button onClick={() => { this.setState({ browseWindow: !this.state.browseWindow }) }}>Browse</button>
                        {browseWindow}
                        <input onChange={this.handleInputChange} value={this.state.name} />
                        <button onClick={this.searchRecipes}>Search</button>
                    </div>
                    <div>
                        <button onClick={() => { this.handlePageChange(-1) }}>Previous page</button>
                        {this.props.name?(<span>Current Page: {this.state.page} </span>):null}
                        <button onClick={() => { this.handlePageChange(1) }}>Next page</button>
                    </div>
                    {/* BaseComponent getting the search result from redux */}
                    <BaseComponent />
                </div>
            )
        }
    }

    const mapStateToProps = function (reduxState){
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