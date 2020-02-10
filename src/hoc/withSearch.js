import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getRecipeByQuery } from '../redux/reducers/recipeReducer';


function withSearch(BaseComponent, searchBtnCb){
    // BaseComponent can display the result of search
    // searchBtnCb is the function will be invoked after press search button, 
    //  the purpose of cb is to redirect to certain page.

    return class extends Component{
        constructor(){
            super();
            this.state = {
                browseWindow: false,
                searchInput: ''
            }
            this.handleInputChange = this.handleInputChange.bind(this);
        }


        handleInputChange(e){
            this.setState({
                searchInput: e.target.value
            });
        }

        searchRecipes = ()=>{
            // send info to redux.
            let params = `name=${this.state.searchInput}`
            this.props.getRecipeByQuery(params);
            // ** working: category search.

            // after press search btn, exe the callback function
            // (mainly for redirect to certain page.)
            searchBtnCb();
        }

        render(){
            // need to check what kind of type search.
            browseWindow = this.state.browseWindow?(<ul>
                <li>Meal Type</li>
                <li>Dish Type</li>
                <li>Region</li>
                <li>Ingredient</li>
            </ul>):null;

            return (
                <div>
                    <div>
                        {/* showing category window */}
                        <button onClick={()=>{this.setState({browseWindow: !this.state.browseWindow})}}>Browse</button>
                        {browseWindow}
                        <input onChange={this.handleInputChange} />
                        <button onClick={this.searchRecipes}>Search</button>
                    </div>
                    {/* BaseComponent getting the search result from redux */}
                    <BaseComponent />
                </div>
            )
        }
    }
}


export default connect(undefined, { getRecipeByQuery })(withSearch);