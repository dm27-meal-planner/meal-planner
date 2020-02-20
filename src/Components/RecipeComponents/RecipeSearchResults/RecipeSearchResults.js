import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import withSearch from '../../../hoc/withSearch';
import RecipeDetailCard from '../RecipeCards/RecipeDetailCard/RecipeDetailCard';
import loading from '../../../animations/loading.gif';
import './stylesheet/RecipeSearchResults.scss';

class RecipeSearchResults extends Component {

    constructor() {
        super();
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        this.setState({
            loading: false
        })
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
                {this.props.searchResults.length?
                searchResultList:
                <h2>No result, please search other recipe.</h2>}
            </div>)
        }, () => { });

        if (this.state.loading) {
            return (
                <img src={loading} alt='loading' />
            )
        }

        return (
            <div className='RecipeSearchResult-wrapper'>
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