import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import {getMealsForUser, addMeal} from '../../redux/reducers/mealplanReducer'
import _ from 'lodash'

import './stylesheet/NextMeal.scss'
import { Popover } from 'antd'
import { Link } from 'react-router-dom'


const NextMeal = (props) => {

  const [currentMeal, changeCurrentMeal] = useState(null)
  const [mealTime, changeMealTime] = useState(null)

  console.log(currentMeal)
  
  useEffect(() => findNearestMeal(), [props.meals.length])

    const findNearestMeal = () => {
      if(+moment().format('H') >= 10 && +moment().format('H') <= 13){
          changeCurrentMeal(props.meals.find(ele => ele.resourceid === 'lunch' && moment(ele.date).format('DDD') === moment().format('DDD')))
          changeMealTime('Lunch')
        } else if(+moment().format('H') >= 14 && +moment().format('H') <= 15){
          changeCurrentMeal(props.meals.find(ele => ele.resourceid === 'snack' && moment(ele.date).format('DDD') === moment().format('DDD')))
          changeMealTime('Snack')
        } else if(+moment().format('H') >= 16 && +moment().format('H') <= 21){
          changeCurrentMeal(props.meals.find(ele => ele.resourceid === 'dinner' && moment(ele.date).format('DDD') === moment().format('DDD')))
          changeMealTime('Dinner')
        } else {
          changeCurrentMeal(props.meals.find(ele => ele.resourceid === 'breakfast' && moment(ele.date).format('DDD') === moment().format('DDD')) )
          changeMealTime('Breakfast')

        }
      }

    if(props.loading){
      return <div>Loading...</div>
    }

    return(
        <>
          {!currentMeal ? <p>You have don't have anything planned for {mealTime}. </p> : 
            <div className='next-meal' >
                <p>Your next meal is {_.upperFirst(currentMeal.resourceid)}</p>
              <p>You have planned to make {currentMeal.title} </p>
              <Popover title={`${currentMeal.title} for ${_.upperFirst(currentMeal.resourceid)}` } content={
                <div>
                  <span></span>
                  <Link to={`/recipe/${currentMeal.recipe_id}`}><button>Go to recipe</button></Link>
                </div>
              } >
                <div className='next-meal-element' style={{ backgroundImage: `${`url(${currentMeal.image ? currentMeal.image : 'https://imbindonesia.com/images/placeholder/camera.jpg'})`}`, backgroundSize: '100% 100%', backgroundRepeat:'no-repeat'}}>
                  <div><span>{currentMeal.title}</span></div>
                </div>
              </Popover>
            </div>}
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