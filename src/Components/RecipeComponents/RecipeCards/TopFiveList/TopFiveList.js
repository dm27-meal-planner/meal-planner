import React, { Component } from 'react';
import RecipeOutlineCard from './RecipeOutlineCard/RecipeOutlineCard';
import {Link} from 'react-router-dom';
import './stylesheet/TopFiveList.scss';

class TopFiveList extends Component {

    render() {
        const recipeList = this.props.recipeList.map(r => {
            return (
                <Link to={`/recipe/${r.recipe_source[0]+r.recipe_id}`} key={r.recipe_id}>
                    <RecipeOutlineCard recipe={r} editFlag={this.props.editFlag} />
                </Link>
            )
        })
        return (
            <div className='TopFiveList-wrapper'>
                <h2>{this.props.listName} </h2>
                <div>
                    {recipeList}
                </div>
            </div>
        )
    }
}
export default TopFiveList;