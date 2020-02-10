import React, { Component } from 'react';
import RecipeOutlineCard from './RecipeOutlineCard/RecipeOutlineCard';
import {Link} from 'react-router-dom'

class TopFiveList extends Component {
    constructor() {
        super();
    }
    render() {
        const recipeList = this.props.recipeList.map(r => {
            return (
                <Link to={`/recipe/${r.recipe_id}`} key={r.recipe_id}>
                    <RecipeOutlineCard recipe={r} editFlag={this.props.editFlag} />
                </Link>
            )
        })
        return (
            <div>
                <span>{this.props.listName} </span>
                <div>
                    {recipeList}
                </div>
            </div>
        )
    }
}
export default TopFiveList;