import React, {useState, useEffect} from 'react'
import moment from 'moment'

const Clock = () => {

    const [time, changeTime] = useState(moment().format('MMMM Do h:mm:ss A'))

    setInterval(() => 
        changeTime(moment().format('MMMM Do h:mm:ss A'))
    , 1000);

    return <h3>{time}</h3>
    
} 
    
export default Clock