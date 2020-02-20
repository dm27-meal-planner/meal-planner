import React, {useState, useEffect} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import ReactDOM from 'react-dom'
import { Popover } from 'antd'
import NextMeal from './NextMeal';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import Clock from './Clock';
import {getMealsForUser, addMeal} from '../../redux/reducers/mealplanReducer'
import loadingAnimation from '../../animations/loading.gif'
import { Link, HashRouter } from 'react-router-dom';

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
            meals.push({title: ele.title, date: ele.date, resourceId:ele.resourceid, extendedProps: {image: ele.image, recipe_id: ele.recipe_id, nutritional_info: ele.nutritional_info, ingredients: ele.ingredients, total_time: ele.total_time}})
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
            <HashRouter>
                <Popover title={`${event.title} for ${event._def.resourceIds[0]}`} content={
                    <>
                        <div style={{display: 'flex', flexDirection: 'column', marginLeft: 'auto', marginRight:'auto'}}>
                            <span style={{textAlign: 'center'}}>{event.title} {event.extendedProps.total_time ? `${event.extendedProps.total_time} min.` : null}</span>
                            <Link style={{marginLeft: 'auto', marginRight:'auto', marginTop: '10px'}} to={`/recipe/${event.extendedProps.recipe_id}`}>
                                <button>Go To Recipe</button>
                            </Link>
                        </div>
                        <Popover content={
                            <table>
                                <tbody>

                                {event.extendedProps.nutritional_info.slice(0,9).map((ele, i) => {
                                    return (<tr key={i} >
                                        <th><strong>{ele.title}</strong></th>
                                        <td>{ele.amount} {ele.unit}</td>
                                    </tr>)
                                })}
                                </tbody>
                            </table>} trigger={'hover'}>
                                <button style={{width :'100%',marginLeft: 'auto', marginRight:'auto', marginTop: '10px'}}>Nutritional Info.</button>
                        </Popover>
                        <Popover content={
                            <table>
                                <tbody>
                                    {event.extendedProps.ingredients ? event.extendedProps.ingredients.map((ele, i) => {
                                        return (
                                            <tr>
                                                <th key={i}>
                                                    <img src={ele.image} alt='ingredient-image' height='40px' width='40px'/>
                                                </th>
                                                <td>
                                                    <span> <strong> {+ele.amount.toFixed(2)} {ele.unit} {ele.ingredient_name} </strong> </span>
                                                </td>
                                            </tr>
                                        )
                                    }): null}
                                </tbody>
                            </table>
                        } trigger='hover'>
                                <button>ingredients</button>
                        </Popover>
                    </>
                        } trigger='hover' >
                        <div style={{ position:'relative', backgroundImage: `url(${event.extendedProps.image || 'https://imbindonesia.com/images/placeholder/camera.jpg'})`, backgroundSize: '100% 100%', backgroundRepeat:'no-repeat', width:'100%', height:'120px', margin: '0px', padding:'0px', borderRadius: '10px'}} >
                            <div className='eventTitle' style={{borderBottomRightRadius: '10px', borderBottomLeftRadius: '10px'}}>
                                <div className='toRecipe' style={{whiteSpace: 'pre-wrap', padding: '1px'}} >{event.title}</div>
                            </div>
                    </div>
                </Popover>
            </HashRouter>
        )
         ReactDOM.render(  newResource , el)
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