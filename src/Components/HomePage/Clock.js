import React, {useState} from 'react'
import moment from 'moment'

const Clock = () => {

    const [time, changeTime] = useState(moment().format('MMMM Do h:mm:ss A'))

    setInterval(() => 
        changeTime(moment().format('MMMM Do h:mm:ss A'))
    , 1000);

    return <p>{time}</p>
    
} 
    
export default Clock