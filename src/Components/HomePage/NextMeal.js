import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import './stylesheet/NextMeal.scss'


const NextMeal = (props) => {

    const [events,  changeEvents] = useState([
        {title: 'burrito-lunch', date:'2020-02-11', resourceId: 'lunch', backgroundColor: 'red'}, 
        {title: 'burrito-dinner', date:moment().format(), resourceId:'dinner'}, 
        {title: 'burrito-breakfast', date:moment().format(), resourceId:'breakfast'}, 
        {title: 'burrito-snack', date:'2020-02-15', resourceId:'snack'} 
    ])


    const findNearestMeal = () => {
        if(moment().isBetween(moment().hour(10), moment().hour(14))){
            return events.find(ele => ele.resourceId === 'lunch')
        } else if(moment().isBetween(moment().hour(14), moment().hour(16))){
          return events.find(ele => ele.resourceId === 'snack')
        } else if(moment().isBetween(moment().hour(16), moment().hour(22))){
          return events.find(ele => ele.resourceId === 'dinner')
        } else {
          return events.find(ele => ele.resourceId === 'breakfast')
        }
      }

    const [currentMeal, changeCurrentMeal] = useState(findNearestMeal())

    return(
        <div className='next-meal' >
                <p>Your next meal is {currentMeal.resourceId}</p>
                <p>You have planned to cook {currentMeal.title} </p>
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return {

    }
}

export default connect(null)(NextMeal)