import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import UserLoginLogout from '../GuestLanding/UserLoginLogout'

import './style/NavBar.scss'

const NavBar = (props) => {

    if(!props.user_id){
        return(
        <div style={{border: 'black solid 2px'}} className='navbar' >
            <Link to='/' ><p>MealPlan</p></Link>
            <div className="menulinks">
                <Link to='/recipes'><p>Recipes</p></Link>
                <UserLoginLogout />
            </div>
        </div>
        )
    }

    return(
        <div className='navbar' style={{border: 'black solid 2px'}} >
            <span className="title">
                <Link to='/' className='site-title'><p>MealPlan</p></Link>
            </span>
            <span className="menulinks">
                <Link to='/mealplan' ><p>Meal Plan</p></Link>
                <Link to='/nutritional'><p>Meal Plan Nutrition</p></Link>
                <Link to='/fridge' ><p>Fridge</p></Link>
                <Link to='/grocerylist' ><p>Grocery List</p></Link>
                <Link to='/recipes'><p>Recipes</p></Link>
                <UserLoginLogout />
            </span>

        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return {
        user_id: reduxState.user.user_id       
    }
}

export default connect(mapStateToProps)(NavBar) 