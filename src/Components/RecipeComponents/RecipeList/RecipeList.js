import React, {Component} from 'react';
import {connect} from 'react-redux';
import withSearch from '../../../hoc/withSearch';
import TopFiveList from '../RecipeCards/TopFiveList/TopFiveList';

class RecipeList extends Component{
    constructor(){
        super();
    }
    redirectToSearchResult = ()=>{
        // after press search button, redirect to search result page.

    }
    render(){
        return (
            <div>
                {withSearch(<div></div>, redirectToSearchResult)}
                {/* update recipeList */}
                <TopFiveList listName='Recently Added' recipeList={[]} editFlag={false}/>
                <TopFiveList listName='Your Recipes' recipeList={[]} editFlag={true}/>
                <TopFiveList listName='Most Liked' recipeList={[]} editFlag={false}/>
            </div>
        )
    }
}

const mapStateToProps = function (reduxState){
    // update the redux info.
    return {
        recentlyAddedRecipes: [],
        userRecipes: [],
        mostLiked: [],
        searchResults: []
    }
}

export default connect(mapStateToProps, {}) (RecipeList);