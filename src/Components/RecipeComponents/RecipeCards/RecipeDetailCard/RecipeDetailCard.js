import React, {Component} from 'react';
import './stylesheet/RecipeDetailCard.scss';
import { Rate } from 'antd';

class RecipeDetailCard extends Component{

    render(){
        return (
            <div className='RecipeDetailCard'>
                <div className='image-container'>
                    <img className='RecipeDetailCard-img' src={this.props.recipe.recipe_img} alt={`${this.props.recipe.recipe_name}`}/>
                </div>
                <div className='RecipeDetailCard-name'>{this.props.recipe.recipe_name}</div>
                <div className='RecipeDetailCard-author'>by {this.props.recipe.recipe_author}</div>
                <div className='RecipeDetailCard-lastline'>
                    <span className='RecipeDetailCard-time'>{this.props.recipe.recipe_time} mins</span>
                    {/* review hasn't appear in the database. */}
                    <Rate className='rating' disabled value={this.props.recipe.recipe_review} />
                    {/* <div>{this.props.recipe.recipe_review}</div> */}
                </div>
            </div>
        )
    }
}
export default RecipeDetailCard;