import React, { Component } from 'react';
import './RecipeOutlineCard.css';
class RecipeOutlineCard extends Component {

    handleEdit = () => {
        // redirect to edit page
    }
    handleDelete = () => {
        // call redux to delete the recipe.
    }

    render() {
        return (
            <div key={this.props.recipe.id}>
                <img src={this.props.recipe.img} />
                <span>{this.props.recipe.name}</span>
                {this.props.editFlag ?
                    (
                        <div>
                            <button onClick={handleEdit}>Edit</button>
                            <button onClick={handleDelete}>Delete</button>
                        </div>
                    ) :
                    null}
            </div>
        )
    }
}
export default RecipeOutlineCard;