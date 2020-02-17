import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Redirect, Link } from 'react-router-dom'
import axios from 'axios';
import MealTypeCard from '../RecipeCards/MealTypeCard/MealTypeCard';
class RecipeEditor extends Component {
    constructor() {
        super();
        this.state = {
            // ---------first column
            recipeName: '',
            recipeImg: '',
            recipeAuthorId: '',

            recipeMealType: '',
            mealTypeWindow: false,

            // ---------second column
            recipePrepTimeHour: '',
            recipePrepTimeMin: '',
            recipeCookTimeHour: '',
            recipeCookTimeMin: '',

            recipeDes: '',

            recipeNutrition: {},

            // ---------third column
            recipeIngredients: [],

            recipeDirection: '',
        }
    }

    componentDidMount() {
        // edit: need to bring data from database.
        if (this.props.match.params.recipe_id) {
            let sourceId = this.props.match.params.recipe_id;
            axios.get(`/api/recipe/id/${sourceId}`).then(response => {
                // if the user is the author
                if (response.data.recipe_author_id === this.props.user_id) {
                    this.setState({
                        recipeId: response.data.recipe_id,
                        recipeImg: response.data.recipe_img,
                        recipeName: response.data.recipe_name,
                        recipeAuthor: response.data.recipe_author,
                        recipeAuthorId: response.data.recipe_author_id,

                        recipeServings: response.data.recipe_servings,
                        recipeCuisine: response.data.recipe_cuisine,
                        recipeMealType: response.data.recipe_meal_type,

                        recipePrepTimeHour: Math.floor(response.data.recipe_prep_time / 60),
                        recipePrepTimeMin: response.data.recipe_prep_time % 60,
                        recipeCookTimeHour: Math.floor(response.data.recipe_cook_time / 60),
                        recipeCookTimeMin: response.data.recipe_cook_time % 60,

                        recipeDes: response.data.recipe_description,

                        recipeNutrition: response.data.recipe_nutrition,

                        recipeIngredients: response.data.recipe_ingredients,

                        recipeDirection: response.data.recipe_directions,
                    })
                } else {
                    // user using illegal way to enter. redirect to recipe page.
                    // this.props.history.push('/home');
                }
            })
        }
    }

    handleUserInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleMealTypeWindow = () => {
        this.setState({
            mealTypeWindow: !this.state.mealTypeWindow
        })
    }

    handleMealTypeChange = (e) => {
        this.setState({
            recipeMealType: e.currentTarget.value
        })
    }

    handleSubmitClick = () => {
        // add a new recipe
        if (this.state.recipeAuthorId) {

        } else {
            // edit and save the recipe.

        }
    }

    // handleDishTypeWindow = () => {
    //     this.setState({
    //         dishTypeWindow: !this.state.dishTypeWindow
    //     })
    // }

    // handleDishTypeChange = (e) => {
    //     if(e.target.checked){
    //         // remove dish type
    //         target.removeAttribute('checked');
    //         // **
    //     }else{
    //         // add dish type
    //         target.setAttribute('checked', true);
    //         // **
    //     }
    // }


    render() {

        let mealTypeWindow = this.state.mealTypeWindow ? (<div>
            <MealTypeCard 
                recipeMealType={this.state.recipeMealType}
                handleMealTypeChange={this.handleMealTypeChange}
                handleMealTypeWindow={this.handleMealTypeWindow}
            />
            {/* <span>Select One</span>
            <ul>
                <li><input type='radio' name='meal-type' value='breakfast'
                    checked={this.state.recipeMealType === 'breakfast'}
                    onChange={this.handleMealTypeChange} /> Breakfast </li>
                <li><input type='radio' name='meal-type' value='lunch'
                    checked={this.state.recipeMealType === 'lunch'}
                    onChange={this.handleMealTypeChange} /> Lunch </li>
                <li><input type='radio' name='meal-type' value='dinner'
                    checked={this.state.recipeMealType === 'dinner'}
                    onChange={this.handleMealTypeChange} /> Dinner </li>
            </ul>
            <button onClick={this.handleMealTypeWindow}>Done </button> */}
        </div>) : null

        // let dishTypeWindow = this.state.dishTypeWindow ? (<div>
        //     <span>Select Many</span>
        //     <ul>
        //         <li><input type='checkbox' onClick={this.handleDishTypeChange} /></li>
        //     </ul>
        //     <button onClick={this.handleDishTypeWindow}>Done </button>
        // </div>) : null

        return (
            <div>
                <div className='first-column-wrapper'>
                    <div>
                        <input name='recipeName' onChange={this.handleUserInput}
                            placeholder='Recipe Name' value={this.state.recipeName} />
                        <input name='recipeImg' onChange={this.handleUserInput}
                            placeholder='Picture URL' value={this.state.recipeImg} />
                    </div>
                    <div>
                        <span>Create Your Own Recipe!</span>
                    </div>
                    <div>
                        <div>
                            <span>Meal Type</span>
                            <button onClick={this.handleMealTypeWindow}>Select</button>
                        </div>
                        {mealTypeWindow}
                        {/* <div>
                            <span>Dish Type</span>
                            <button onClick={this.handleDishTypeWindow}>Select</button>
                        </div>
                        {dishTypeWindow} */}
                    </div>
                </div>
                <div className='second-column-wrapper'>
                    <div>
                        <span>Prepare Time:</span>
                        <input type='number' min='0' step='1'
                            name='recipePrepTimeHour'
                            onChange={this.handleUserInput} /> hour
                        <input type='number' min='0' step='1'
                            name='recipePrepTimeMin'
                            onChange={this.handleUserInput} max='59' />min

                        <span>Cook Time: </span>
                        <input type='number' min='0' step='1'
                            name='recipeCookTimeHour'
                            onChange={this.handleUserInput} /> hour
                        <input type='number' min='0' step='1'
                            name='recipeCookTimeMin'
                            onChange={this.handleUserInput} max='59' />min
                    </div>
                    <div>
                        <span>Descriptions: </span>
                        <textarea name='recipeDes' onChange={this.handleUserInput}>
                            {this.state.recipeDes}
                        </textarea>
                    </div>
                    <div>
                        <h3>Nutrition Information</h3>
                        {/* **beautify later */}
                        <div>{JSON.stringify(this.state.recipeNutrition)} </div>
                    </div>
                </div>
                <div className='third-column-wrapper'>
                    <div>
                        {/* **Ingredient list, waiting for design the common use one. */}
                    </div>
                    <div>
                        <span>Directions:</span>
                        <div>
                            <textarea name='recipeDirection' onChange={this.handleUserInput} >
                                {this.state.recipeDirection}
                            </textarea>
                        </div>
                    </div>
                </div>

                <button onClick={this.handleSubmitClick} >Submit</button>
            </div>
        )
    }
}

const mapStateToProps = function (reduxState) {
    return {
        user_id: reduxState.user.user_id,
    }
}

export default connect(mapStateToProps, {})(RecipeEditor);