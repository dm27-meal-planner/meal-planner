import React, {useState, useEffect, useRef} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash'
import { Redirect, Prompt } from 'react-router';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import ReactDOM from 'react-dom'
import moment from 'moment'
import { Popover } from 'antd'
import { addMeal, editMeal, deleteMeal } from '../../../redux/reducers/mealplanReducer'
import 'antd/es/popover/style/css'
import './stylesheet/MealPlanCurrentWk.scss'



const MealPlanCurrentWk = (props) => {


    const [initializeDnd, toggleDnd] = useState(true)
    const [selectedRecipe, selectRecipe] = useState(null)
    const [events,  changeEvents] = useState([])
    const [modifiedEvents, modifyEvent] = useState([])
    const [addedMeals, addMoreMeals]= useState([])
    const [editedMeals, editMoreMeals] = useState([])
    const [deletedMeals, deleteMoreMeals] = useState([])
    const [changesSaved, setToFalse] = useState(true)
    const [count, increment] = useState(1)

    let calendarRef = useRef()

    useEffect(() => {
        if(selectedRecipe){
            createDraggableRecipe(selectedRecipe)

        }
    }, [selectedRecipe])




    
    useEffect(() => {
        if(editedMeals.length === 0 && deletedMeals.length === 0 && addedMeals.length === 0 ){
            setToFalse(true)
        }else{
            setToFalse(false)
        }
    },[addedMeals,editedMeals,deletedMeals])

    useEffect(() => {
        parseMeals(props.meals)
    }, [])

    const parseMeals = (propsMeals) => {
        let meals = []
        propsMeals.map(ele => {
            meals.push({id: ele.mealplan_id, title: ele.title, date: ele.date, resourceId: ele.resourceid, extendedProps: {image: ele.image}})
        })
        changeEvents(meals);
        modifyEvent(meals)
    }

    const newEventRender = ({event, el}) => {
        let newResource = (
            <Popover title={`${event._def.resourceIds[0]} for ${moment(event.start).format('dddd')}`} content={<div><span>{event.title}</span><br /><button>Go To Recipe</button></div>} trigger='click' >
                <div style={{ position:'relative', backgroundImage: `url(${event.extendedProps.image || 'https://www.heavydutydirect.ca/wp-content/uploads/2019/02/camera-placeholder-150x150.jpg'})`, backgroundSize: '100% 100%', backgroundRepeat:'no-repeat', width:'100%', height:'100px', margin: '5px'}} >
                    <div className='eventTitle'>
                        <div className='toRecipe'>{event.title}</div>
                    </div>
                </div>
            </Popover>
        )
         ReactDOM.render(newResource, el)
    }

    const newDraggable = (selectedRecipe) => {
        let newinstance = (
            <div className='fc-event' id={`new-event-${count}`} style={{ position:'relative', backgroundImage: `url(${selectedRecipe.extendedProps.image || 'https://imbindonesia.com/images/placeholder/camera.jpg'})`, backgroundSize: '100% 100%', backgroundRepeat:'no-repeat', width:'100px', height:'100px', marginLeft: 'auto', marginRight:'auto'}} >
                <div className='eventTitle'>
                    <div className='toRecipe'>{initializeDnd ? selectedRecipe.title : 'Pick a recipe.' }</div>
                </div>
            </div>
        )
        ReactDOM.render(newinstance, document.getElementById('new-recipe-container'))

    }

    const createDraggableRecipe = (selectedRecipe) => {
        newDraggable(selectedRecipe)
        toggleDnd(true)
        new Draggable(document.getElementById('new-recipe-container'), {
            itemSelector: `#new-event-${count}`
                    }
                )
                increment(count + 1)
    }   

    const SaveChanges = () => {
        if(addedMeals.length){
            addedMeals.map(ele => {
                props.addMeal(props.user_id, {date: ele.date, resourceid: ele.resourceId, title: ele.title, image: ele.image})
            })
            addMoreMeals([])
        } 

        if(editedMeals.length){
            editedMeals.map(ele => {
                props.editMeal(ele.id,{date: ele.date, resourceid: ele.resourceId, title: ele.title, user_id: props.user_id} )
            })
            editMoreMeals([])
        }
        if(deletedMeals.length){
            deletedMeals.map(ele => {
                props.deleteMeal(ele, props.user_id)
            })
            deleteMoreMeals([])
        }
    }




    if(!props.user_id){
        return <Redirect to='/' />
    }
    return (
        <div className='calendar-container-mealplan-currentweek' >
            <FullCalendar
            ref={calendarRef} 
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
            resourceAreaWidth='12%'
            contentHeight='auto'
            events={events}
            droppable={true}
            drop={({date, resource}) => {

                console.log(date)

                let calendarApi = calendarRef.current.getApi()

                
                calendarApi.addEvent({                    
                    extendedProps: selectedRecipe.extendedProps,
                    start:date,
                    title: selectedRecipe.title,
                    resourceId: resource.id
                })
                
                let allEvents = calendarApi.getEvents()

                console.log(allEvents)

                addMoreMeals([...addedMeals, {id: +allEvents[allEvents.length - 1]._instance.instanceId, title: selectedRecipe.title, date: moment(date).format(), resourceId: resource.id, image: selectedRecipe.extendedProps.image}])
                modifyEvent([...modifiedEvents, {id: +allEvents[allEvents.length - 1]._instance.instanceId, title: selectedRecipe.title, date: moment(date).format(), resourceId: resource.id, image: selectedRecipe.extendedProps.image}])


            }}
            height='auto'
            defaultTimedEventDuration={'00:01'}
            header={
                {center: 'title', left: ''}
            }
            resourceLabelText={'Meal Type'}
            editable={true}
            eventDragStop={({jsEvent, event}) => {
                if(document.getElementById('trash').getBoundingClientRect().x < jsEvent.x && document.getElementById('trash').getBoundingClientRect().y < jsEvent.y){
                    event.remove()
                    deleteMoreMeals([...deletedMeals, +event.id])
                }
            }}
            eventDrop={({event}) => {



                // modifyEvent(() => {
                //     let eventsCopy = modifiedEvents.slice()
                //     eventsCopy.find(ele => +ele.id === +event._instance.instanceId || event.id).date = moment(event.start).format()
                //     eventsCopy.find(ele => +ele.id === +event._instance.instanceId || event.id ).resourceId = event._def.resourceIds[0]
                //     return eventsCopy
                // })
                // console.log(modifiedEvents)
                // console.log(editedMeals)
                // console.log(event)
                // console.log(moment(event.start).format())


                if(addedMeals.some(ele => +ele.id === +event._instance.instanceId )){
                    addMoreMeals(() => {
                        let eventsCopy = addedMeals.slice()
                        eventsCopy.find(ele => +ele.id === +event._instance.instanceId).date = moment(event.start).format()
                        eventsCopy.find(ele => +ele.id === +event._instance.instanceId ).resourceId = event._def.resourceIds[0]
                        return eventsCopy
                    })
                } else if(editedMeals.some(ele => +ele.id === +event.id) && modifiedEvents.some(ele => moment(ele.date).format() === moment(event.start).format()) && editedMeals.some(ele => ele.resourceId === event._def.resourceIds[0])){
                        console.log('exact')
                        editMoreMeals(() =>{
                            let eventsCopy = _.cloneDeep(editedMeals)
                            eventsCopy.splice(eventsCopy.findIndex(ele => +ele.id === +event.id), 1)
                            return eventsCopy
                        })

                    
                    }else if(editedMeals.some(ele => +ele.id === +event.id)){
                        editMoreMeals(() =>{
                                let eventsCopy = _.cloneDeep(editedMeals)
                                eventsCopy.find(ele => +ele.id === +event.id).date = moment(event.start).format()
                                eventsCopy.find(ele => +ele.id === +event.id ).resourceId = event._def.resourceIds[0]
                                return eventsCopy
                            }
                        )
                    } else {
                        let eventsCopy = _.cloneDeep(modifiedEvents)
                        eventsCopy.find(ele => +ele.id === +event.id).date = moment(event.start).format()
                        eventsCopy.find(ele => +ele.id === +event.id ).resourceId = event._def.resourceIds[0]
                        editMoreMeals([...editedMeals, eventsCopy.find(ele => +ele.id === +event.id)])

                    }
                }



            }
        

            />


            <div>
                <div id='new-recipe-container'>
                    <div className='fc-event' id='newEvent' style={{ position:'relative', backgroundImage: `url(https://imbindonesia.com/images/placeholder/camera.jpg)`, backgroundSize: '100% 100%', backgroundRepeat:'no-repeat', width:'100px', height:'100px', marginLeft: 'auto', marginRight:'auto'}} >
                        <div className='eventTitle'>
                            <div className='toRecipe'>Pick a recipe.</div>
                        </div>
                    </div>
                </div>
                    <select name='recipes' onChange={ e => selectRecipe(JSON.parse(e.target.value))} id='recipes'>
                        <option value={null} >Select a recipe</option>
                        <option value={JSON.stringify({id: 6, title: 'pizza', extendedProps:{ image: 'https://www.qsrmagazine.com/sites/default/files/styles/story_page/public/PizzaHut.jpg?itok=g-UcJm9k'}})} >pizza</option>
                        <option value={JSON.stringify({id: 50, title: 'burrito', extendedProps:{ image: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/10/16/0/DV2904_Korean-BBQ-Burrito_s4x3.jpg.rend.hgtvcom.826.620.suffix/1539714414867.jpeg'}})} >burrito</option>

                    </select>

            </div>

            <button onClick={SaveChanges}>Save Changes</button>
            <div id='trash' style={{position: 'fixed', bottom: '20px', right: '50px'}} >🗑</div>
            <Prompt 
            when={!changesSaved}
            message='Leaving will discard your unsaved changed. Are you sure you want to leave?'
            />
        </div>

    )
}

const mapStateToProps = (reduxState) => {
    return {
        user_id: reduxState.user.user_id,
        meals: reduxState.mealplan.meals
    }
}

export default connect(mapStateToProps, { addMeal, editMeal, deleteMeal })(MealPlanCurrentWk)