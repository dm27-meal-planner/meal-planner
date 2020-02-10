import React, {useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

import './stylesheet/HomePage.scss'
import NextMeal from './NextMeal';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';


const HomePage = (props) => {

    const [events,  changeEvents] = useState([{title: 'lunch', date:'2020-02-14'}])

    if(!props.user_id){
        return <Redirect to='/'/>
    }

    return (
        <div>
            <FullCalendar defaultView="dayGridWeek" plugins={[ dayGridPlugin, timeGridPlugin ]} events={events}/>
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