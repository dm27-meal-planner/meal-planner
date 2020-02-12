import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import {getMealsForUser, addMeal} from '../../redux/reducers/mealplanReducer'

import './stylesheet/NextMeal.scss'


const NextMeal = (props) => {

  const [currentMeal, changeCurrentMeal] = useState(null)
  
  useEffect(() => findNearestMeal(), [props.meals])

    const findNearestMeal = () => {
      if(+moment().format('H') >= 10 && +moment().format('H') <= 13){
          changeCurrentMeal(props.meals.find(ele => ele.resourceid === 'lunch'))
        } else if(+moment().format('H') >= 14 && +moment().format('H') <= 15){
          changeCurrentMeal(props.meals.find(ele => ele.resourceid === 'snack'))
        } else if(+moment().format('H') >= 16 && +moment().format('H') <= 21){
          changeCurrentMeal(props.meals.find(ele => ele.resourceid === 'dinner'))
        } else {
          changeCurrentMeal(props.meals.find(ele => ele.resourceid === 'breakfast'))
        }
      }

    if(props.loading){
      return <div>Loading...</div>
    }

    return(
        <>
          {!currentMeal ? <p>you have no upcoming meals</p> : 
            <div className='next-meal' >
                <p>Your next meal is {currentMeal.resourceid}</p>
              <p>You have planned to cook {currentMeal.title} </p>
            </div> }
        </>
    )
}

const mapStateToProps = (reduxState) => {
    return {
      user_id: reduxState.user.user_id,
      meals: reduxState.mealplan.meals,
      loading: reduxState.mealplan.loading
    }
}

export default connect(mapStateToProps, {getMealsForUser, addMeal})(NextMeal)