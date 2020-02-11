import { Switch, Route } from "react-router";
import HomePage from "./Components/HomePage/HomePage";
import React from 'react'
import GuestLanding from "./Components/GuestLanding/GuestLanding";
import RecipeList from './Components/RecipeComponents/RecipeList/RecipeList'
import MealPlanCurrentWeek from './Components/MealPlanComponents/MealPlanCurrentWk/MealPlanCurrentWk'
import GroceryList from './Components/GroceryList/GroceryList'
import Fridge from './Components/Fridge/Fridge'


let routes = (

    <Switch>
        <Route path='/recipes' component={RecipeList}/>
        <Route path='/mealplan' component={MealPlanCurrentWeek}/>
        <Route path='/fridge' component={Fridge}/>
        <Route path='/grocerylist' component={GroceryList}/>
        <Route path='/home' component={HomePage} />
        <Route exact path='/' component={GuestLanding}/>
    </Switch>

)

export default routes


