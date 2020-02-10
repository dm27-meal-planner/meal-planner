import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import withSearch from '../../../hoc/withSearch';
import RecipeDetailCard from '../RecipeCards/RecipeDetailCard/RecipeDetailCard';

class RecipeSearchResults extends Component {
    constructor() {
        super();
    }

    componentDidMount() {

    }

    render() {
        let searchResultList = this.props.searchResults.map((r, i) => {
            return (
                // change the path once the route is sure.
                <Link to={`/recipe/${r.recipe_id}`}>
                    <RecipeDetailCard recipe={r} key={i} />
                </Link>
            )
        })
        return (
            <div>
                {withSearch(
                    <div className='searchResultList'>
                        {searchResultList}
                    </div>
                    , () => {})}
            </div>
        )
    }
}

const mapStateToProps = function (reduxState) {
    // update the redux info.
    return {
        searchResults: reduxState.recipe.searchResults
    }
}

export default connect(mapStateToProps, {})(RecipeSearchResults);