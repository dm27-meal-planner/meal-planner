import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteRecipe } from '../../../../../redux/reducers/recipeReducer';
import './stylesheet/RecipeOutlineCard.scss';

class RecipeOutlineCard extends Component {

    handleEdit = () => {
        // redirect to edit page
    }
    handleDelete = () => {
        // call redux to delete the recipe.
        this.props.deleteRecipe(this.props.recipe.recipe_id);
    }

    render() {
        return (
            <div key={this.props.recipe.recipe_id} className='OutlineCard-wrapper'>
                <div className='image-container'>
                    <img src={this.props.recipe.recipe_img} alt='recipe' />
                </div>
                <div>
                    <span>{this.props.recipe.recipe_name}</span>
                    {/* {this.props.editFlag ?
                        (
                            <div>
                                <button onClick={this.handleEdit}>Edit</button>
                                <button onClick={this.handleDelete}>Delete</button>
                            </div>
                        ) :
                        null} */}
                </div>
            </div>
        )
    }
}
export default connect(undefined, { deleteRecipe })(RecipeOutlineCard);