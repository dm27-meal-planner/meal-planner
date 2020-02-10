import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import UserLoginLogout from '../GuestLanding/UserLoginLogout'

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
        <div style={{border: 'black solid 2px'}} >
            <p>MealPlan</p>

        <Link to='/mealplan' >Meal Plan</Link>
        <Link to='/fridge' >Fridge</Link>
        <Link to='/grocerylist' >Grocery List</Link>
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