import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
// import { Redirect, Link } from 'react-router-dom'
import axios from 'axios';
import MealTypeCard from '../RecipeCards/MealTypeCard/MealTypeCard';
import RecipeIngredientCard from '../RecipeCards/RecipeIngredientCard/RecipeIngredientCard';
class RecipeEditor extends Component {
    constructor() {
        super();
        this.state = {
            // ---------first column
            recipeId: '',
            recipeName: '',
            recipeImg: '',
            // recipeAuthor: '',
            recipeAuthorId: '',

            recipeServings: 1,
            recipeCuisine: '',
            cuisineList: [],
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
            ingredientWindow: false,

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

        // get cuisine list
        axios.get('/api/recipe/cuisinelist').then(response => {
            this.setState({
                cuisineList: response.data,
            })
        })

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

    handleIngredientWindow = () => {
        this.setState({
            ingredientWindow: !this.state.ingredientWindow
        })
    }

    handleMealTypeChange = (e) => {
        this.setState({
            recipeMealType: e.currentTarget.value
        })
    }

    handleSubmitClick = () => {
        // set the body for api
        let prepTime = this.state.recipePrepTimeHour * 60 + this.state.recipePrepTimeMin;
        let cookTime = this.state.recipeCookTimeHour * 60 + this.state.recipeCookTimeMin;
        let rObj = {
            recipeName: this.state.recipeName,
            recipeImg: this.state.recipeImg,

            recipeServings: this.state.recipeServings,
            recipeCuisine: this.state.recipeCuisine,
            recipeMealType: this.state.recipeMealType,

            recipePrepTime: prepTime,
            recipeCookTime: cookTime,

            recipeDes: this.state.recipeDes,
            recipeNutrition: this.state.recipeNutrition,
            recipeIngredients: this.state.recipeIngredients,
            recipeDirection: this.state.recipeDirection,

            added_date: moment(new Date()).format(),
        }
        // check this is add or edit.
        if (this.props.match.params.recipe_id) {
            // edit and save the recipe.
            axios.put(`/api/recipe/${this.props.match.params.recipe_id}`, rObj)
                .then(response => {
                    alert('Save successfully!');
                    this.props.history.push('/recipes');
                });
        } else {
            // add a new recipe
            axios.post('/api/recipe', rObj).then(response => {
                alert('Added successfully!');
                this.props.history.push('/recipes');
            });
        }
    }

    // For Ingredients
    addToIngredients = async (ingredient) => {
        this.setState({
            recipeIngredients: [...this.state.recipeIngredients, ingredient]
        });
    }
    removeIngredient = (i) => {
        let list = this.state.recipeIngredients.slice();
        list.splice(i, 1);
        this.setState({
            recipeIngredients: list
        });
    }

    changeIngredient = (i, amount) => {
        let list = this.state.recipeIngredients.slice(i)
        list.splice(i, 1, { ...this.state.recipeIngredients[i], amount: amount })
        this.setState({
            recipeIngredients: list
        })
    }


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
                        <span>Cuisine: </span>
                        <select name='recipeCuisine' onChange={this.handleUserInput} value={this.state.recipeCuisine}>
                            <option value=''>Select Cuisine</option>
                            {this.state.cuisineList.map((ele, i) => <option value={ele.cuisine_name.toLowerCase()} key={ele.cuisine_id} >{ele.cuisine_name}</option>)}
                        </select>
                        <span>Serving: </span>
                        <input name='recipeServings' onChange={this.handleUserInput}
                            value={this.state.recipeServings}
                            type='number' min='1' step='1' />
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
                        <span>Nutrition Information</span>
                        <span>This will update after save the recipe.</span>
                        {/* **beautify later */}
                        <div>{JSON.stringify(this.state.recipeNutrition)} </div>
                    </div>
                </div>
                <div className='third-column-wrapper'>
                    <div>
                        <button onClick={this.handleIngredientWindow}>
                            Open ingredient window
                        </button>
                        {this.state.ingredientWindow ? (
                            <RecipeIngredientCard
                                ingredients={this.state.recipeIngredients}
                                changeIngredient={this.changeIngredient}
                                addToIngredients={this.addToIngredients}
                                removeIngredient={this.removeIngredient}
                                closeWindow={this.handleIngredientWindow}
                            />
                        ) : null}
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