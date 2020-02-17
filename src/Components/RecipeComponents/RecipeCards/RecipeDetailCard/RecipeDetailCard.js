import React, {Component} from 'react';

class RecipeDetailCard extends Component{

    render(){
        return (
            <div className='RecipeDetailCard'>
                <img className='RecipeDetailCard-img' src={this.props.recipe.recipe_img} alt={`${this.props.recipe.recipe_name}`}/>
                <div className='RecipeDetailCard-name'>{this.props.recipe.recipe_name}</div>
                <div className='RecipeDetailCard-author'>{this.props.recipe.recipe_author}</div>
                <div className='RecipeDetailCard-time'>{this.props.recipe.recipe_time}</div>
                {/* review hasn't appear in the database. */}
                <div>{this.props.recipe.recipe_review}</div>
            </div>
        )
    }
}
export default RecipeDetailCard;