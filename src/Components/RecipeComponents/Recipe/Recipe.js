import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
class Recipe extends Component {
    constructor() {
        super();
        this.state = {
            recipeName: '',
            recipeImg: '',
            recipeAuthorId: '',
            deleteWindowFlag: false,

            recipeCookTime: '',
            recipeMealType: '',
            recipeDishType: '',
            recipeDes: '',

            recipeNutrition: {},

            recipeIngredients: [],

            recipeDirection: '',
        }
    }

    componentDidMount() {
        axios.get(`/api/recipe/${this.props.match.params.recipe_id}`).then(response => {
            this.setState({
                recipeName: response.data[0].name,
                recipeImg: response.data[0].image,
                recipeAuthorId: response.data[0].user_id,

                recipeCookTime: response.data[0].cook_time,
                recipeMealType: response.data[0].meal_type,
                recipeDishType: response.data[0].dish_type,
                recipeDes: response.data[0].description,

                recipeNutrition: response.data[0].nutritional_info,

                recipeIngredients: response.data.map(e => e.ingredient_name),

                recipeDirection: response.data[0].directions,
            })
        })
    }

    handleEdit = () => {
        // **go to edit page.
    }

    handleDeleteWindow = () => {
        this.setState({
            deleteWindowFlag: !this.state.deleteWindowFlag
        })
    }

    handleDelete = () => {
        // **delete the recipe.

        // **go back to search recipe page.
    }

    render() {
        // only author can modify/delete the recipe
        let recipeModifyButtons = (this.state.recipeAuthorId === this.props.user_id) ? (
            <div className='recipe-modify-btn'>
                <button onClick={() => { this.handleEdit() }} >Edit</button>
                <button onClick={() => { this.handleDeleteWindow() }} >Delete</button>
            </div>) : null;
        // delete window
        let deleteWindow = this.state.deleteWindowFlag ?
            (<div className='delete-window'>
                <div>
                    Are you sure you want to delete this recipe? This cannot be undone!
                </div>
                <div>
                    <button onClick={() => { this.handleDeleteWindow() }}>Go back</button>
                    <button onClick={() => { this.handleDelete() }}>Delete</button>
                </div>
            </div>) : null;
        // ** beautify later
        let nutrition = JSON.stringify(this.state.recipeNutrition);

        return (
            <div className='Recipe-wrapper'>
                <div className='Recipe-title-wrapper'>
                    <div>{this.state.recipeName} </div>
                    <img src={this.state.recipeImg} alt='Recipe-img' />
                    {recipeModifyButtons}
                    {deleteWindow}
                </div>
                <div className='Recipe-info-wrapper'>
                    <ul>
                        <li>Time to make: {this.state.recipeCookTime}</li>
                        <li>Meal Type: {this.state.recipeMealType}</li>
                        <li>Dish Type: {this.state.recipeDishType}</li>
                        <li>Description: {this.state.recipeDes}</li>
                    </ul>
                </div>
                <div className='Recipe-nutrition-wrapper'>
                    <div>{nutrition} </div>
                </div>
                <div className='Recipe-ingredient-wrapper'>
                    {/* ** waiting for ingredient to be implemented. */}
                </div>
                <div className='Recipe-direction-wrapper'>
                    <div>{this.state.recipeDirection}</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function (reduxState) {
    return {
        user_id: reduxState.user.user_id,
    }
}

export default connect(mapStateToProps, {})(Recipe);