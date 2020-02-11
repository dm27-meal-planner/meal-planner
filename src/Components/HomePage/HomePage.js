import React, {useState, useEffect} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import moment from 'moment'
import ReactDOM from 'react-dom'
import { Popover } from 'antd'
import 'antd/es/popover/style/css'

// import { Popover } from 'antd'
// import 'antd/dist/antd.css'





import NextMeal from './NextMeal';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Clock from './Clock';

import './stylesheet/HomePage.scss'

const HomePage = (props) => {

    const [events,  changeEvents] = useState([
        {title: 'burrito', date:'2020-02-11', resourceId: 'lunch', backgroundColor: 'red'}, 
        {title: 'burrito', date:moment().format(), resourceId:'dinner'}, 
        {title: 'burrito', date:moment().format(), resourceId:'breakfast'}, 
        {title: 'burrito', date:'2020-02-15', resourceId:'snack'} 
    ])


    if(!props.user_id){
        return <Redirect to='/'/>
    }

    const newEventRender = ({event, el}) =>{
        console.log(moment().format())
        let newResource = (
            <Popover title={`${event.title} for ${event._def.resourceIds[0]}`} content={<div><span>mexican burrito</span><button>go to recipe</button></div>} trigger='click' >
                <div style={{ position:'relative', backgroundImage: 'url(https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)', backgroundSize: '100% 100%', backgroundRepeat:'no-repeat', width:'90%', height:'100px', margin: '5px'}} >
                    <div className='eventTitle'>
                        <div className='toRecipe'>{event.title}</div>
                    </div>
                </div>
            </Popover>
        )
         ReactDOM.render(newResource, el)
    }


    return (
        <div className='home-page'>
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
    )
}

const mapStateToProps = (reduxState) => {
    return {
        user_id: reduxState.user.user_id,
        username: reduxState.user.username       
    }
}
export default connect(mapStateToProps)(HomePage);