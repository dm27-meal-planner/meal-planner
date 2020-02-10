import React, {useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'

import './stylesheet/HomePage.scss'
import NextMeal from './NextMeal';


const HomePage = (props) => {

    const [events,  changeEvents] = useState([{title: 'lunch', date:'2020-02-14'}])

    return (
        <div>
            <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin ]} events={events}/>
            HomePage
            <NextMeal />
            
        </div>
)
}
export default HomePage;