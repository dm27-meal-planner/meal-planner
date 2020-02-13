import React, {Component} from 'react';
import {connect} from 'react-redux';
import withSearch from '../../../hoc/withSearch';
import {getMostLikedRecipe, getRecentRecipes, getUserRecipe} from '../../../redux/reducers/recipeReducer';
import TopFiveList from '../RecipeCards/TopFiveList/TopFiveList';

class RecipeList extends Component{
    constructor(){
        super();
    }
    componentDidMount(){
        this.props.getMostLikedRecipe();
        this.props.getRecentRecipes();
        if(this.props.user_id){
            this.props.getUserRecipe(this.props.user_id);
        }
    }

    redirectToSearchResult = ()=>{
        // after press search button, redirect to search result page.

    }
    render(){
        let SearchBar = withSearch(()=>{return(<div></div>)}, this.redirectToSearchResult);
        // console.log(SearchBar);
        
        return (
            <div>
                <SearchBar />
                {/* {withSearch(<div></div>, this.redirectToSearchResult)} */}
                <TopFiveList listName='Recently Added' recipeList={this.props.recentlyAddedRecipes} editFlag={false}/>
                <TopFiveList listName='Your Recipes' recipeList={this.props.userRecipes} editFlag={true}/>
                <TopFiveList listName='Most Liked' recipeList={this.props.mostLiked} editFlag={false}/>
            </div>
        )
    }
}

const mapStateToProps = function (reduxState){
    return {
        user_id: reduxState.user.user_id,
        recentlyAddedRecipes: reduxState.recipe.recentlyAddedRecipes,
        userRecipes: reduxState.recipe.userRecipes,
        mostLiked: reduxState.recipe.mostLiked,
        // searchResults: reduxState.recipe.searchResults
    }
}

export default connect(mapStateToProps, {getMostLikedRecipe, getRecentRecipes, getUserRecipe}) (RecipeList);