import React, {useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'





 

const HomePage = (props) => {

    const [dates,  changeDates] = useState([])

    return (
        <div>
            <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin ]} />
            HomePage
        </div>
)
}
export default HomePage;