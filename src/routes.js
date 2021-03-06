import { Switch, Route } from "react-router";
import HomePage from "./Components/HomePage/HomePage";
import React from 'react';
import GuestLanding from "./Components/GuestLanding/GuestLanding";
import RecipeList from './Components/RecipeComponents/RecipeList/RecipeList';
import Recipe from './Components/RecipeComponents/Recipe/Recipe';
import RecipeSearchResults from './Components/RecipeComponents/RecipeSearchResults/RecipeSearchResults';
import RecipeEditor from './Components/RecipeComponents/RecipeEditor/RecipeEditor';
import MealPlanCurrentWeek from './Components/MealPlanComponents/MealPlanCurrentWk/MealPlanCurrentWk';
import GroceryList from './Components/GroceryList/GroceryList';
import Fridge from './Components/Fridge/Fridge';
import MealPlanExe from "./Components/MealPlanComponents/MealPlanExe/MealPlanExe";


let routes = (

    <Switch>
        <Route path='/recipe/add/' component={RecipeEditor} />
        <Route path='/recipe/search' component={RecipeSearchResults} />
        <Route path='/recipe/edit/:recipe_id' component={RecipeEditor} />
        <Route path='/recipe/:recipe_id' component={Recipe} />
        <Route path='/recipes' component={RecipeList}/>
        <Route path='/mealplan' component={MealPlanCurrentWeek}/>
        <Route path='/nutritional' component={MealPlanExe} />
        <Route path='/fridge' component={Fridge}/>
        <Route path='/grocerylist' component={GroceryList}/>
        <Route path='/home' component={HomePage} />
        <Route exact path='/' component={GuestLanding}/>
    </Switch>

)

export default routes


