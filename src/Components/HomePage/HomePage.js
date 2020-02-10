import React, {useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import moment from 'moment'
import ReactDOM from 'react-dom'

import NextMeal from './NextMeal';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Clock from './Clock';

import './stylesheet/HomePage.scss'

const HomePage = (props) => {

    const [events,  changeEvents] = useState([{title: 'lunch', date:'2020-02-14'}, {title: 'dinner', date:moment().format()} ])

    if(!props.user_id){
        return <Redirect to='/'/>
    }

    const newEventRender = ({event, el}) =>{
        let newResource = (
            <div>
                <p>{event.title}</p>
                <img src={`https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`} />
            </div>
        )

        ReactDOM.render(newResource, el)
    }


    return (
        <div>
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
                resourceAreaWidth='15%'
                aspectRatio='1'
                contentHeight='auto'
                events={[{title: 'this is a test', start: moment().format()}]}
                eventRender={(info) => newEventRender(info)}
                
            />
            HomePage
            <NextMeal />
            
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return {
        user_id: reduxState.user.user_id       
    }
}
export default connect(mapStateToProps)(HomePage);