import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import interactionPlugin from '@fullcalendar/interaction';
import ReactDOM from 'react-dom'
import moment from 'moment'
import { Popover } from 'antd'


import '../MealPlanCurrentWk/stylesheet/MealPlanCurrentWk.scss'


const MealPlanExe = (props) => {

    const [events, changeEvents] = useState([])
    const [mealSelected, changeSelectedMeal] = useState(null)

    console.log(mealSelected)




    useEffect(() => {
        parseMeals(props.meals)
    }, [])

    const parseMeals = (propsMeals) => {
        let meals = []
        propsMeals.map(ele => {
            meals.push({id: ele.mealplan_id, title: ele.title, date: ele.date, resourceId: ele.resourceid, isfollowed: ele.isfollowed})
        })
        changeEvents(meals)
    }




    const newEventRender = ({event, el}) =>{
        let newResource = (
            <Popover title={`${event._def.resourceIds[0]} for ${moment(event.start).format('dddd')}`} trigger='click' >
                <div style={{ position:'relative', backgroundImage: `url(${event.extendedProps.image || 'https://www.heavydutydirect.ca/wp-content/uploads/2019/02/camera-placeholder-150x150.jpg'})`, backgroundSize: '100% 100%', backgroundRepeat:'no-repeat', width:'100%', height:'100px', margin: '5px'}} >
                    <div className='eventTitle'>
                        <div className='toRecipe'>{event.title}</div>
                    </div>
                </div>
            </Popover>
        )
         ReactDOM.render(newResource, el)
    }

    if(!props.user_id){
        return <Redirect to='/' />
    }

    return (

        <div>
            <div className='calendar-container-mealplan-currentweek' >
                <FullCalendar
                    defaultView="resourceTimelineWeek"
                    plugins={[ dayGridPlugin, timeGridPlugin, resourceTimelinePlugin, interactionPlugin ]}
                    schedulerLicenseKey='GPL-My-Project-Is-Open-Source'
                    resources={[
                        {id: 'breakfast', title: 'Breakfast' },
                        {id: 'lunch', title: 'Lunch' },
                        {id: 'dinner', title: 'Dinner' },
                        {id: 'snack', title: 'Snack'}
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
                    eventClick={({event}) => {
                        console.log(event)
                        changeSelectedMeal({id: +event.id, title: event.title, date: event.start, mealType: event._def.resourceIds[0]})}}
                    resourceLabelText={'Meal Type'}
                    />
            </div>

            { mealSelected ? <div className='meal-info-container'>
                    <p>{mealSelected.title} for {mealSelected.mealType}</p>
                    <p>{moment(mealSelected.date).format('ll')}</p>
                    <form>
                        <input type='radio' value='true' name='exe' style={{transform:'scale(1.5)'}} />
                        <span style={{position: 'relative', left: '10px'}}>Stuck To Plan</span> 
                        <br />
                        <input type='radio' value='false' name='exe' style={{transform:'scale(1.5)'}}/>
                        <span style={{position: 'relative', left: '10px'}}>Ate Out</span>
                    </form>
            </div> : <div> <p>Please Select A Meal</p></div>}
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return {
        user_id: reduxState.user.user_id,
        meals: reduxState.mealplan.meals       
    }
}

export default connect(mapStateToProps, {})(MealPlanExe) 