import React, {Component} from 'react';
import './RecipeDetailCard.css';
class RecipeDetailCard extends Component{
    constructor(){
        super();
    }
    render(){
        return (
            <div className='RecipeDetailCard'>
                <img className='RecipeDetailCard-img' src={this.props.recipe.image} alt={`${this.props.recipe.name} Picture`}/>
                <div className='RecipeDetailCard-name'>{this.props.recipe.name}</div>
                <div className='RecipeDetailCard-author'>{this.props.recipe.author}</div>
                <div className='RecipeDetailCard-cooktime'>{this.props.recipe.cook_time}</div>
                {/* review hasn't appear in the database. */}
                {/* <div>{this.props.recipe.review}</div> */}
            </div>
        )
    }
}
export default RecipeDetailCard;