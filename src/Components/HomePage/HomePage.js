import React, {useState, useEffect} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
// import moment from 'moment'
import ReactDOM from 'react-dom'
import { Popover } from 'antd'
import 'antd/es/popover/style/css'
import NextMeal from './NextMeal';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Clock from './Clock';
import Fridge from '../Fridge/Fridge';
import {getMealsForUser, addMeal} from '../../redux/reducers/mealplanReducer'
import loadingAnimation from '../../animations/loading.gif'

import './stylesheet/HomePage.scss'

const HomePage = (props) => {
    
    const [events,  changeEvents] = useState(null)
    
    useEffect(() => {

        if(props.user_id){
            props.getMealsForUser(props.user_id)
            parseMeals(props.meals)
        }
        
    }, [props.meals.length])
    
    const parseMeals = (propsMeals) => {
        let meals = []
        propsMeals.map(ele => {
            meals.push({title: ele.title, date: ele.date, resourceId:ele.resourceid, extendedProps: {image: ele.image}})
        })
        changeEvents(meals)
    }
    
    if(!props.user_id){
        return <Redirect to='/'/>
    }
    
    if(props.loading){
        return <img src={loadingAnimation} alt='loading' />
    }

    const newEventRender = ({event, el}) =>{
        let newResource = (
            <Popover title={`${event.title} for ${event._def.resourceIds[0]}`} content={<div><span>{event.title}</span><button>Go To Recipe</button></div>} trigger='click' >
                <div style={{ position:'relative', backgroundImage: `url(${event.extendedProps.image || 'https://imbindonesia.com/images/placeholder/camera.jpg'})`, backgroundSize: '100% 100%', backgroundRepeat:'no-repeat', width:'90%', height:'100px', margin: '5px'}} >
                    <div className='eventTitle'>
                        <div className='toRecipe' style={{whiteSpace: 'pre-wrap'}} >{event.title}</div>
                    </div>
                </div>
            </Popover>
        )
         ReactDOM.render(newResource, el)
    }
    

    return (
        <div className='home-page'>
            <div className='calendarAndNextMeal'>
            <div className='calendar-container' >
                <h1>{props.username}'s Weekly Meal Plan</h1>
                <Clock />
                <FullCalendar defaultView="resourceTimelineWeek" plugins={[ dayGridPlugin, timeGridPlugin, resourceTimelinePlugin ]} schedulerLicenseKey='GPL-My-Project-Is-Open-Source'
                    resources={[
                        {id: 'breakfast', title: 'breakfast' },
                        {id: 'lunch', title: 'lunch' },
                        {id: 'dinner', title: 'dinner' },
                        {id: 'snack', title: 'snack'}
                    ]}  
                    slotLabelInterval={{day: 1}}
                    slotLabelFormat={{weekday: 'short'}}
                    eventRender={(info) => newEventRender(info)}
                    resourceAreaWidth='8%'
                    contentHeight='auto'
                    events={events}
                    height='auto'
                    defaultTimedEventDuration={'00:01'}
                    header={
                        {center: 'title', left: ''}
                    }
                    resourceLabelText={'Meal Type'}
                    
                />
            </div>

            <NextMeal />
            </div>
            <div className="itemsInFridge">
                <Fridge />
            </div>
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return {
        user_id: reduxState.user.user_id,
        username: reduxState.user.username,
        meals: reduxState.mealplan.meals,
        loading: reduxState.mealplan.loading    
    }
}
export default connect(mapStateToProps, {getMealsForUser, addMeal})(HomePage);