import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import withSearch from '../../../hoc/withSearch';
import { getMostLikedRecipe, getRecentRecipes, getUserRecipe, clearSearchResult } from '../../../redux/reducers/recipeReducer';
import TopFiveList from '../RecipeCards/TopFiveList/TopFiveList';
import './stylesheet/RecipeList.scss'

class RecipeList extends Component {

    componentDidMount() {
        this.props.getMostLikedRecipe();
        this.props.getRecentRecipes();
        if (this.props.user_id) {
            this.props.getUserRecipe(this.props.user_id);
        }
        // clear search result
        this.props.clearSearchResult();
    }

    redirectToSearchResult = () => {
        // after press search button, redirect to search result page.
        this.props.history.push('/recipe/search');
    }
    render() {
        let SearchBar = withSearch(() => { return (<div></div>) }, this.redirectToSearchResult);
        // console.log(SearchBar);

        return (
            <div className='RecipeList-wrapper'>
                <header>
                    {this.props.user_id?(
                        <Link to='/recipe/add'><button className='addBtn'>Add a new recipe</button></Link>
                    ):null}
                    <SearchBar />
                    {this.props.user_id?(
                        <div className='dummy'></div>
                    ):null}
                </header>
                
                {/* {withSearch(<div></div>, this.redirectToSearchResult)} */}
                <main>
                    <TopFiveList listName='Recently Added' recipeList={this.props.recentlyAddedRecipes} editFlag={false} />
                    <TopFiveList listName='Your Recipes' recipeList={this.props.userRecipes} editFlag={true} />
                    <TopFiveList listName='Most Liked' recipeList={this.props.mostLiked} editFlag={false} />
                </main>
            </div>
        )
    }
}

const mapStateToProps = function (reduxState) {
    return {
        user_id: reduxState.user.user_id,
        recentlyAddedRecipes: reduxState.recipe.recentlyAddedRecipes,
        userRecipes: reduxState.recipe.userRecipes,
        mostLiked: reduxState.recipe.mostLiked,
        // searchResults: reduxState.recipe.searchResults
    }
}

export default connect(mapStateToProps, { getMostLikedRecipe, getRecentRecipes, getUserRecipe, clearSearchResult })(RecipeList);