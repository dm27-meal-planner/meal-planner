import React, { Component } from 'react';

class MealTypeCard extends Component {

    render() {
        return (
            <div>
                <span>Select One</span>
                <ul>
                    <li><input type='radio' name='meal-type' value='breakfast'
                        checked={this.props.recipeMealType === 'breakfast'}
                        onChange={this.props.handleMealTypeChange} /> Breakfast </li>
                    <li><input type='radio' name='meal-type' value='lunch'
                        checked={this.props.recipeMealType === 'lunch'}
                        onChange={this.props.handleMealTypeChange} /> Lunch </li>
                    <li><input type='radio' name='meal-type' value='dinner'
                        checked={this.props.recipeMealType === 'dinner'}
                        onChange={this.props.handleMealTypeChange} /> Dinner </li>
                </ul>
                {/* <button onClick={this.props.handleMealTypeWindow}>Done </button> */}
            </div>
        )
    }
}
export default MealTypeCard;