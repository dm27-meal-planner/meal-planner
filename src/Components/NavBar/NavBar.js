import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import UserLoginLogout from '../GuestLanding/UserLoginLogout'

import './style/NavBar.scss'

const NavBar = (props) => {

    if(!props.user_id){
        return(
        <div style={{border: 'black solid 2px'}} >
            <p>MealPlan</p>
            <p>Recipe</p>
            <UserLoginLogout />
        </div>
        )
    }

    return(
        <div className='navbar' style={{border: 'black solid 2px'}} >
            <p className='site-title'>MealPlan</p>

        <Link to='/' ><p>Home</p></Link>
        <Link to='/mealplan' ><p>Meal Plan</p></Link>
        <Link to='/nutritional'><p>Meal Plan Nutrition</p></Link>
        <Link to='/fridge' ><p>Fridge</p></Link>
        <Link to='/grocerylist' ><p>Grocery List</p></Link>
        <Link to='/recipes'><p>Recipes</p></Link>
        <UserLoginLogout />

        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return {
        user_id: reduxState.user.user_id       
    }
}

export default connect(mapStateToProps)(NavBar) 