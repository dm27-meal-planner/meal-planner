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
                <div key={r.recipe_id}>
                    <Link to={`/recipe/${r.recipe_source[0] + r.recipe_id}`}>
                        <RecipeDetailCard recipe={r} key={i} />
                    </Link>
                </div>
            )
        })

        let SearchBar = withSearch(() => {
            return (<div className='searchResultList'>
                {searchResultList}
            </div>)
        }, () => { });

        return (
            <div>
                <SearchBar />
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