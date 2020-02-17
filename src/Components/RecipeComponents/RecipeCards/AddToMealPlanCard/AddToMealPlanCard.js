import React, { Component } from 'react';
import MealTypeCard from '../MealTypeCard/MealTypeCard';
import axios from 'axios';
import moment from 'moment';

class AddToMealPlanCard extends Component {
    constructor() {
        super();
        this.state = {
            date: '',
            mealType: '',
            mealTypeWindow: false,

        }
    }

    handleUserInput = (e) => {        
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleAddMP = () => {
        let mpObject = {
            recipe_id: this.props.recipeId,
            date: moment(this.state.date).format(),
            resourceid: this.state.mealType,
            nutritional_info: JSON.stringify(this.props.recipeNutrition),
            title: this.props.recipeName,
            image: this.props.recipeImg
        }
        console.log(mpObject);
        axios.post(`/api/mealplan/7`, mpObject).then(response=>{
            alert('Added to Meal Plan!');
            this.setState({
                mealTypeWindow: false,
            })
        })
    }

    handleMealTypeWindow = () => {
        this.setState({
            mealTypeWindow: !this.state.mealTypeWindow
        })
    }

    handleMealTypeChange = (e) => {
        this.setState({
            mealType: e.currentTarget.value
        })
    }

    render() {
        let mealTypeWindow = this.state.mealTypeWindow ? (
            <MealTypeCard
                recipeMealType={this.state.mealType}
                handleMealTypeChange={this.handleMealTypeChange}
                handleMealTypeWindow={this.handleMealTypeWindow}
            />) : null;
        return (
            <div className='add-mp-card-wrapper'>
                <span>The date to add to meal plan:</span>
                <input name='date' type='date' onChange={this.handleUserInput}/>
                <span>Select the meal: </span>
                <button onClick={this.handleMealTypeWindow}>Select</button>
                {mealTypeWindow}
                <button onClick={this.handleAddMP}>Add To Meal Plan</button>
            </div>
        )
    }
}
export default AddToMealPlanCard;