import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import UserLoginLogout from '../GuestLanding/UserLoginLogout'

import './style/NavBar.css'

class NavBar extends Component {
    constructor () {
        super();

        this.state = {
            menuStatus: 'closed'
        }
    }

    toggleMenu = () => {
        if (this.state.menuStatus === "closed") {
           this.setState({menuStatus: "opened"});
        } else {
           this.setState({menuStatus: "closed"});
        }
    }

    render() {
        if(!this.props.user_id){
            return(
            <>
            <div style={{border: 'black solid 2px'}} className='navbar' >
                <Link to='/' ><p>MealPlan</p></Link>
                <div className="menulinks">
                    <Link to='/recipes'><p>Recipes</p></Link>
                    <UserLoginLogout />
                </div>
                <img onClick={this.toggleMenu} className="hamburger" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png" alt="oof" />
                <div className={`dropdown-nav ${this.state.menuStatus}`}>
                    <Link onClick={this.toggleMenu} to='/recipes'><p>Recipes</p></Link>
                    <UserLoginLogout />
                </div>
            </div>
            </>
            )
        }
    
        return(
            <>
            <div className='navbar' style={{border: 'black solid 2px'}} >
                <div className="title">
                    <Link to='/' className='site-title'><p>MealPlan</p></Link>
                </div>
                <div className="menulinks">
                    <Link to='/mealplan' ><p>Meal Plan</p></Link>
                    <Link to='/nutritional'><p>Meal Plan Nutrition</p></Link>
                    <Link to='/fridge' ><p>Fridge</p></Link>
                    <Link to='/grocerylist' ><p>Grocery List</p></Link>
                    <Link to='/recipes'><p>Recipes</p></Link>
                    <UserLoginLogout />
                </div>
                <img onClick={this.toggleMenu} className="hamburger" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png" alt="oof" />
                <div className={`dropdown-nav ${this.state.menuStatus}`}>
                    <Link onClick={this.toggleMenu} to='/mealplan' ><p>Meal Plan</p></Link>
                    <Link onClick={this.toggleMenu} to='/nutritional'><p>Meal Plan Nutrition</p></Link>
                    <Link onClick={this.toggleMenu} to='/fridge' ><p>Fridge</p></Link>
                    <Link onClick={this.toggleMenu} to='/grocerylist' ><p>Grocery List</p></Link>
                    <Link onClick={this.toggleMenu} to='/recipes'><p>Recipes</p></Link>
                    <UserLoginLogout />
                </div>
            </div>
            </>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        user_id: reduxState.user.user_id       
    }
}

export default connect(mapStateToProps)(NavBar) 