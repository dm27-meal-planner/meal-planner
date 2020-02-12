import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios';
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
            // recipeDishType: '',
            // dishTypeWindow: false,

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
            axios.get(`/api/recipe/${this.props.match.params.recipe_id}`).then(response => {
                // if the user is the author
                if (response.data[0].user_id === this.props.user_id) {
                    this.setState({
                        recipeName: response.data[0].name,
                        recipeImg: response.data[0].image,
                        recipeAuthorId: response.data[0].user_id,

                        recipeMealType: response.data[0].meal_type,
                        // recipeDishType: response.data[0].dish_type,

                        recipePrepTimeHour: Math.floor(response.data[0].prep_time / 60),
                        recipePrepTimeMin: response.data[0].prep_time % 60,
                        recipeCookTimeHour: Math.floor(response.data[0].cook_time / 60),
                        recipeCookTimeMin: response.data[0].cook_time % 60,

                        recipeDes: response.data[0].description,

                        recipeNutrition: response.data[0].nutritional_info,

                        recipeIngredients: response.data.map(e => e.ingredient_name),

                        recipeDirection: response.data[0].directions,
                    })
                } else {
                    // user using illegal way to enter. redirect to recipe page.
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
        if (this.state.recipeAuthorId){

        }else{
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
            <span>Select One</span>
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
            <button onClick={this.handleMealTypeWindow}>Done </button>
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
                            onChange={handleUserInput} /> hour
                        <input type='number' min='0' step='1'
                            name='recipePrepTimeMin'
                            onChange={handleUserInput} max='59' />min

                        <span>Cook Time: </span>
                        <input type='number' min='0' step='1'
                            name='recipeCookTimeHour'
                            onChange={handleUserInput} /> hour
                        <input type='number' min='0' step='1'
                            name='recipeCookTimeMin'
                            onChange={handleUserInput} max='59' />min
                    </div>
                    <div>
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