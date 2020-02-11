import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import ReactDOM from 'react-dom'
import moment from 'moment'
import { Popover } from 'antd'
import 'antd/es/popover/style/css'
import './stylesheet/MealPlanCurrentWk.scss'


const MealPlanCurrentWk = (props) => {

    const [reduxEvents,  changeReduxEvents] = useState([
        {id: 1, title: 'burrito', date:'2020-02-11', resourceId: 'lunch', backgroundColor: 'red'}, 
        {id: 2, title: 'burrito', date:moment().format(), resourceId:'dinner'}, 
        {id: 3, title: 'burrito', date:moment().format(), resourceId:'breakfast'}, 
        {id: 4, title: 'burrito', date:'2020-02-15', resourceId:'snack'} 
    ])
    
    const [events,  changeEvents] = useState([...reduxEvents])

    const newEventRender = ({event, el}) =>{
        let newResource = (
            <Popover title={`${event.title} for ${event._def.resourceIds[0]}`} content={<div><span>mexican burrito</span><button>go to recipe</button></div>} trigger='click' >
                <div style={{ position:'relative', backgroundImage: 'url(https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)', backgroundSize: '100% 100%', backgroundRepeat:'no-repeat', width:'100%', height:'100px', margin: '5px'}} >
                    <div className='eventTitle'>
                        <div className='toRecipe'>{event.title}</div>
                    </div>
                </div>
            </Popover>
        )
         ReactDOM.render(newResource, el)
    }

    const createDraggableRecipe = () => {
        new Draggable(document.getElementById('new-recipe-container'), {
            itemSelector: '.item',
            eventData:{
                id: 5,
                title: 'pizza'
            }
        })  
    }



    if(!props.user_id){
        return <Redirect to='/' />
    }
    return (
        <div className='calendar-container-mealplan-currentweek' >
            <FullCalendar
            defaultView="resourceTimelineWeek"
            plugins={[ dayGridPlugin, timeGridPlugin, resourceTimelinePlugin, interactionPlugin ]}
            schedulerLicenseKey='GPL-My-Project-Is-Open-Source'
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
            events={reduxEvents}
            height='auto'
            defaultTimedEventDuration={'00:01'}
            header={
                {center: 'title', left: ''}
            }
            resourceLabelText={'Meal Type'}
            editable={true}
            eventDrop={({event}) => {
                changeEvents(() => {
                    let eventsCopy = events.slice() 
                    eventsCopy.find(ele => ele.id == event.id).date = moment(event.start).format()
                    eventsCopy.find(ele => ele.id == event.id ).resourceId = event._def.resourceIds[0]
                    return eventsCopy
                })
            }}
            // droppable={true}
            eventReceive={({event}) => changeEvents([...events, {id: event.id, title: event.title, date: moment(event.start).format(), resourceId: event._def.resourceIds[0]}])}
            />


            
            {/* <img id='draggable-el'  /> */}

            <div id='new-recipe-container'>
                <img className='item' src='https://cdn.modpizza.com/wp-content/uploads/2019/11/Maddy.png' height='100px' width='100px' />
            </div>
            <button onClick={createDraggableRecipe}>Create Draggable Recipe</button>
            <button onClick={() => {
                changeReduxEvents([...events])
                props.history.push('/')
                }} >Save to redux</button>
            
            </div>
    )
}

const mapStateToProps = (reduxState) => {
    return {
        user_id: reduxState.user.user_id
    }
}

export default connect(mapStateToProps)(MealPlanCurrentWk)