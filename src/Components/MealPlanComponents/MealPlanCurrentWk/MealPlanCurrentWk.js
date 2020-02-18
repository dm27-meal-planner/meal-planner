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
import { Popover, message } from 'antd'
import { addMeal, editMeal, deleteMeal, searchFunction, searchByCategory, autoCompleteSearch } from '../../../redux/reducers/mealplanReducer'
import searching from '../../../animations/searching.gif'
import searchIcon from '../../../icons/search-solid.svg'
import loading from '../../../animations/loading.gif'
import './stylesheet/MealPlanCurrentWk.scss'
import CategroyCascader from './CategroyCascader';
import leftArrow from '../../../icons/left-arrow.png'
import rightArrow from '../../../icons/right-arrow.png'
import trash from '../../../icons/trash.png'



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
    const [results, updateResults] = useState([])
    const [categoryResults, updateCategoryResults] = useState([])
    const [searchInput, updateInput] = useState('')
    const [pageNumber, changePageNumber] = useState(0)
    const [currentCategory, changeCurrentCategory] = useState(null)

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

    useEffect(() => {
        if(props.categoryResults.length){
            updateCategoryResults(props.categoryResults)
            updateResults([])

        }
    }, [props.categoryResults])

    useEffect(() => {
        if(props.searchResults.length){
            updateResults(props.searchResults)
            updateCategoryResults([])
        }
    }, [props.searchResults])

    useEffect(() => {
             props.autoCompleteSearch(searchInput)
    }, [searchInput])


    const parseMeals = (propsMeals) => {
        let meals = []
        propsMeals.map(ele => {
            meals.push({id: ele.mealplan_id, title: ele.title, date: ele.date, resourceId: ele.resourceid, extendedProps: {image: ele.image}})
        })
        changeEvents(meals);
        modifyEvent(meals)
    }

    const handleAutoCompleteClick = (value) => {
        props.searchFunction(value, 0)
        updateInput(value)
        changePageNumber(0)
    }

    const nextPage = (value, pageNumber) => {
        if(results.length){
            props.searchFunction(value, pageNumber + 1)
            changePageNumber(pageNumber + 1)
            
        } else {
            props.searchByCategory(value, pageNumber + 1)
            changePageNumber(pageNumber + 1)
        }

    }

    const prevPage = (value, pageNumber) => {

        if(pageNumber >= 1 && results.length){
            props.searchFunction(value, pageNumber - 1)
            changePageNumber(pageNumber - 1)
        } else if(pageNumber >= 1 && categoryResults.length) {
            props.searchByCategory(value, pageNumber - 1)
            changePageNumber(pageNumber - 1)
        } else {
            alert('You are on the first page')
        }
    }
    const categorySelected = (value) => {
         props.searchByCategory(value, 0)
         changePageNumber(0)
    }
    const newEventRender = ({event, el}) => {
        let newResource = (
            <Popover title={`${event._def.resourceIds[0]} for ${moment(event.start).format('dddd')}`} content={<div><span>{event.title}</span><br /><button>Go To Recipe</button></div>} trigger='click' >
                <div style={{ position:'relative', backgroundImage: `url(${event.extendedProps.image || selectedRecipe.extendedProps.image ||'https://www.heavydutydirect.ca/wp-content/uploads/2019/02/camera-placeholder-150x150.jpg'})`, backgroundSize: '100% 100%', backgroundRepeat:'no-repeat', width:'100%', height:'100px',  margin: '0px', padding:'0px', borderRadius: '10px'}} >
                    <div className='eventTitle' style={{borderBottomRightRadius: '10px', borderBottomLeftRadius: '10px'}}>
                        <div className='toRecipe' style={{whiteSpace: 'pre-wrap'}} >{event.title || selectedRecipe.title}</div>
                    </div>
                </div>
            </Popover>
        )
         ReactDOM.render(newResource, el)
    }

    const newDraggable = (selectedRecipe) => {
        let newinstance = (
            <div className='fc-event' id={`new-event-${count}`} style={{ position:'relative', backgroundImage: `url(${selectedRecipe.extendedProps.image || 'https://imbindonesia.com/images/placeholder/camera.jpg'})`, backgroundSize: '100% 100%', backgroundRepeat:'no-repeat', width:'100px', height:'120px', marginLeft: 'auto', marginRight:'auto'}} >
                <div className='eventTitle' style={{borderBottomRightRadius: '10px', borderBottomLeftRadius: '10px'}}>
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
                props.addMeal(props.user_id, {recipe_id: ele.apiId, date: ele.date, resourceid: ele.resourceId, title: ele.title, image: ele.image, fromApi: `${ele.source === 'api' ? true : false }` })
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

        message.success('Changes have been saved!')
    }
//------------------------------------------- JSX ----------------------------------------------------------
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

                let calendarApi = calendarRef.current.getApi()
                
                calendarApi.addEvent({         
                    extendedProps: selectedRecipe.extendedProps,
                    start:date,
                    title: selectedRecipe.title,
                    resourceId: resource.id
                })
                
                let allEvents = calendarApi.getEvents()

                addMoreMeals([...addedMeals, {id: +allEvents[allEvents.length - 1]._instance.instanceId, title: selectedRecipe.title, date: moment(date).format(), resourceId: resource.id, image: selectedRecipe.extendedProps.image, source: selectedRecipe.extendedProps.source, apiId: selectedRecipe.id}])
                modifyEvent([...modifiedEvents, {id: +allEvents[allEvents.length - 1]._instance.instanceId, title: selectedRecipe.title, date: moment(date).format(), resourceId: resource.id, image: selectedRecipe.extendedProps.image, source: selectedRecipe.extendedProps.source, apiId: selectedRecipe.id}])


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

                if(addedMeals.some(ele => +ele.id === +event._instance.instanceId )){
                    addMoreMeals(() => {
                        let eventsCopy = addedMeals.slice()
                        eventsCopy.find(ele => +ele.id === +event._instance.instanceId).date = moment(event.start).format()
                        eventsCopy.find(ele => +ele.id === +event._instance.instanceId ).resourceId = event._def.resourceIds[0]
                        return eventsCopy
                    })
                } else if(editedMeals.some(ele => +ele.id === +event.id) && modifiedEvents.some(ele => moment(ele.date).format() === moment(event.start).format()) && editedMeals.some(ele => ele.resourceId === event._def.resourceIds[0])){
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
                            <div className='toRecipe'>Select a recipe.</div>
                        </div>
                    </div>
                </div>
            </div>

            <button onClick={SaveChanges} disabled={changesSaved} >Save Changes</button>

            <div>
                    <div>
                        <input  id='search-recipe' style = {{backgroundImage: `url(${props.searching ? loading : searchIcon})` }} name='search' value={searchInput}  onChange={e => updateInput(e.target.value)} />
                        <ul className='auto-complete-list' style={{display: `${!props.autoCompleteResults.length ? 'none' : 'block'}`}} >
                            {props.autoCompleteResults.length ? props.autoCompleteResults.map((ele, i) => {
                                return <li key={i} onClick={() => handleAutoCompleteClick(ele.title)} >{ele.title}</li>
                            }): null}
                        </ul>
                    </div>

                <ul id='search-result-container' >
                        <p>Showing Results for: {results.length ? searchInput: categoryResults.length ? currentCategory : 'Nothing'}</p>
                    { props.searching || props.categorySearching ? <img src={searching} alt='seraching' /> : results.length ?  results.map((ele, i) => {
                        return <li key={i} onClick={() => selectRecipe(_.cloneDeep({id: ele.id, title: ele.title, extendedProps:{ image: `https://spoonacular.com/recipeImages/${ele.image}`, source: ele.source}}))} className='search-result-block' >
                            <img src={`https://spoonacular.com/recipeImages/${ele.image}`} alt='recipe'  width='70px'/>
                            <p>{ele.title}</p>
                        </li>
                    }) : categoryResults.length ? categoryResults.map((ele, i) => {
                        return <li key={i} onClick={() => selectRecipe(_.cloneDeep({id: ele.id, title: ele.title, extendedProps:{ image: `https://spoonacular.com/recipeImages/${ele.image}`, source: ele.source}}))} className='search-result-block' >
                            <img src={`https://spoonacular.com/recipeImages/${ele.image}`} alt='recipe'  width='70px'/>
                            <p>{ele.title}</p>
                    </li>}): null}

                    {results.length ? <li className='nav-arrows'>
                        <img onClick={() => prevPage(searchInput, pageNumber)} src={leftArrow} height='15px' width='15px' />
                        <p>Page number: {pageNumber + 1}</p>
                        <img src={rightArrow} onClick={() => nextPage(searchInput, pageNumber)} height='15px' width='15px'/>
                    </li> : categoryResults.length ? <li className='nav-arrows'>
                        <img onClick={() => prevPage(currentCategory, pageNumber)} src={leftArrow} height='15px' width='15px' />
                        <p>Page number: {pageNumber + 1}</p>
                        <img src={rightArrow} onClick={() => nextPage(currentCategory, pageNumber)} height='15px' width='15px'/>
                    </li>: null}
                </ul>
            </div>
            <CategroyCascader selectRecipe={selectRecipe} categorySelected={categorySelected} changeCurrentCategory={changeCurrentCategory} />

            <img id='trash' style={{position: 'fixed', bottom: '20px', right: '50px'}} src={trash} alt='delete-icon' />
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
        meals: reduxState.mealplan.meals,
        searching: reduxState.mealplan.searching,
        searchResults: reduxState.mealplan.searchResults,
        categorySearching: reduxState.mealplan.categorySearching,
        categoryResults: reduxState.mealplan.categoryResults,
        autoCompleteResults: reduxState.mealplan.autoCompleteResults
    }
}

export default connect(mapStateToProps, { addMeal, editMeal, deleteMeal, searchFunction, searchByCategory, autoCompleteSearch })(MealPlanCurrentWk)