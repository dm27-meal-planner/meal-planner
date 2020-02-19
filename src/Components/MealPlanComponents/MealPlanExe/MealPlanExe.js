import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import interactionPlugin from '@fullcalendar/interaction';
import ReactDOM from 'react-dom'
import moment from 'moment'
import { Popover } from 'antd'
import { Radio } from 'antd'
import {changeIsFollowed, getNutrition, mealSearch, mealNutrition} from '../../../redux/reducers/mealplanReducer'
import { Bar } from 'react-chartjs-2'
import _ from 'lodash'
import searching from '../../../animations/searching.gif'
import searchIcon from '../../../icons/search-solid.svg'


import '../MealPlanCurrentWk/stylesheet/MealPlanCurrentWk.scss'


const MealPlanExe = (props) => {

    const [events, changeEvents] = useState([])
    const [mealSelected, changeSelectedMeal] = useState(null)
    const [recipesNutrients, changeNutrients] = useState(null)
    const [daySelected, changeDaySelected] = useState(null)
    const [altMealSelected, changeAltMeal] = useState(null)
    const [searchInput, changeInput] = useState('')
    const [altMealNutrition, changeAltMealNutrition] = useState(null)
    const [plannedFollowed, changePlanFollowed] = useState(null)

    useEffect(() => {
        if(daySelected){
            getNutritionForDay()
        } else {
            changeNutrients(null)
        }
    }, [daySelected])
    
    useEffect(() => {
        parseMeals(props.meals)
    }, [props.meals])

    useEffect(() => {
        if(altMealSelected){
             props.mealNutrition(altMealSelected.id)
        }
    } , [altMealSelected])

    useEffect(() => {
        if(mealSelected){
            changePlanFollowed(mealSelected.isfollowed)
            parseNutrients(mealSelected.nutritional_info)
        }
    },[mealSelected])

    useEffect(() => {
        if(props.altMealNutrition.length){
           let calories = props.altMealNutrition.find(ele => ele.title === 'Calories').amount
           let fat = props.altMealNutrition.find(ele => ele.title ==='Fat').amount
           let saturatedFat = props.altMealNutrition.find(ele => ele.title ==='Saturated Fat').amount
           let carbs = props.altMealNutrition.find(ele => ele.title ==='Carbohydrates').amount
           let netcarbs = props.altMealNutrition.find(ele => ele.title ==='Net Carbohydrates').amount
           let sugar = props.altMealNutrition.find(ele => ele.title ==='Sugar').amount
           let cholesterol = props.altMealNutrition.find(ele => ele.title ==='Cholesterol').amount
           let sodium = props.altMealNutrition.find(ele => ele.title ==='Sodium').amount
           let protein = props.altMealNutrition.find(ele => ele.title === 'Protein').amount

           changeAltMealNutrition([calories, fat, saturatedFat, carbs, netcarbs, sugar, cholesterol, sodium/10, protein])
        }
    }, [props.altMealNutrition])

    const parseNutrients = (mealNutrients) => {

        let calories = mealNutrients.find(ele => ele.title === 'Calories').amount
        let fat = mealNutrients.find(ele => ele.title ==='Fat').amount
        let saturatedFat = mealNutrients.find(ele => ele.title ==='Saturated Fat').amount
        let carbs = mealNutrients.find(ele => ele.title ==='Carbohydrates').amount
        let netcarbs = mealNutrients.find(ele => ele.title ==='Net Carbohydrates').amount
        let sugar = mealNutrients.find(ele => ele.title ==='Sugar').amount
        let cholesterol = mealNutrients.find(ele => ele.title ==='Cholesterol').amount
        let sodium = mealNutrients.find(ele => ele.title ==='Sodium').amount
        let protein = mealNutrients.find(ele => ele.title === 'Protein').amount
        changeNutrients([calories, fat, saturatedFat, carbs, netcarbs, sugar, cholesterol, sodium/10, protein])
    }

    const parseMeals = (propsMeals) => {
        let meals = []
        propsMeals.map(ele => {
            meals.push({id: ele.mealplan_id, title: ele.title, date: ele.date, resourceId: ele.resourceid, isfollowed: ele.followed_plan, nutritional_info: ele.nutritional_info, extendedProps: {image: ele.image}})
        })
        changeEvents(meals)
    }

    const data = {
        labels: [
            'Calories (cal)',
            'Fat (g)',
            'Saturated Fat (g)',
            'Carbohydrates (g) ',
            'Net Carbohydrates (g)',
            'Sugar (g)' ,
            'Cholesterol (mg)',
            'Sodium (g)',
            'Protien (g)'
        ],
        datasets: [{
            label: `${daySelected ?  moment().dayOfYear(daySelected).format('dddd, MMM DD') : mealSelected ? mealSelected.title : 'Planned Meal'}`,
            data: recipesNutrients,
            backgroundColor: [
            '#FF6384',
            '#0E3B43',
            '#357266',
            '#2699FB',
            '#F9C80E',
            '#F86624',
            '#EA3546',
            '#662E9B',
            '#65532F'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#0E3B43',
            '#357266',
            '#2699FB',
            '#F9C80E',
            '#F86624',
            '#EA3546',
            '#662E9B',
            '#65532F'
            ]
        },
        {
            label: `${altMealSelected ? altMealSelected.title: ''}`,
            data: altMealNutrition,
            backgroundColor: [
            '#FF6384',
            '#0E3B43',
            '#357266',
            '#2699FB',
            '#F9C80E',
            '#F86624',
            '#EA3546',
            '#662E9B',
            '#65532F'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#0E3B43',
            '#357266',
            '#2699FB',
            '#F9C80E',
            '#F86624',
            '#EA3546',
            '#662E9B',
            '#65532F'
            ] 
        }
    
    ]
    };

    const getNutritionForDay = () => {
       let todaysMeals = props.meals.filter(ele => moment(ele.date).format('DDD') === daySelected)

       let caloriesForTheDay = todaysMeals.reduce((acc, ele) => acc + ele.nutritional_info[0].amount , 0)
       let fatForTheDay = todaysMeals.reduce((acc, ele) => acc + ele.nutritional_info[1].amount , 0)
       let saturatedFatForTheDay = todaysMeals.reduce((acc, ele) => acc + ele.nutritional_info[2].amount , 0)
       let carbsForTheDay = todaysMeals.reduce((acc, ele) => acc + ele.nutritional_info[3].amount , 0)
       let netCarbsForTheDay = todaysMeals.reduce((acc, ele) => acc + ele.nutritional_info[4].amount , 0)
       let sugarForTheDay = todaysMeals.reduce((acc, ele) => acc + ele.nutritional_info[5].amount , 0)
       let cholesterolForTheDay = todaysMeals.reduce((acc, ele) => acc + ele.nutritional_info[6].amount , 0)
       let sodiumForTheDay = todaysMeals.reduce((acc, ele) => acc + ele.nutritional_info[7].amount , 0)
       let proteinForTheDay = todaysMeals.reduce((acc, ele) => acc + ele.nutritional_info[8].amount , 0)


       changeNutrients([caloriesForTheDay.toFixed(2), fatForTheDay.toFixed(2), saturatedFatForTheDay.toFixed(2), carbsForTheDay.toFixed(2), netCarbsForTheDay.toFixed(2), sugarForTheDay.toFixed(2), cholesterolForTheDay.toFixed(2), (sodiumForTheDay/10).toFixed(2), proteinForTheDay.toFixed(2)])
       changeAltMeal(null)
       changeAltMealNutrition(null)
       changePlanFollowed(null)
       changeSelectedMeal(null)
    }




    const newEventRender = ({event, el}) =>{
        let newResource = (
            <Popover title={`${event._def.resourceIds[0]} for ${moment(event.start).format('dddd')}`} trigger='click' >
                <div style={{ margin:'0px, !import', position:'relative', backgroundImage: `url(${event.extendedProps.image || 'https://www.heavydutydirect.ca/wp-content/uploads/2019/02/camera-placeholder-150x150.jpg'})`, backgroundSize: '100% 100%', backgroundRepeat:'no-repeat', width:'100%', height:'120px', margin: '0px', padding:'0px', borderRadius: '10px'}} >
                    <div className='eventTitle' style={{borderBottomRightRadius: '10px', borderBottomLeftRadius: '10px'}}>
                        <div className='toRecipe' style={{whiteSpace: 'pre-wrap'}} >{event.title}</div>
                    </div>
                </div>
            </Popover>
        )
         ReactDOM.render(newResource, el)
    }

    const changeIsFollowed = (id, boolean) => {
        props.changeIsFollowed(id, boolean)
        changeSelectedMeal({...mealSelected, isfollowed: boolean})

        parseNutrients(mealSelected.nutritional_info)
            if(boolean){
                changeAltMeal(null)
                changeAltMealNutrition(null)
            }
    }



    if(!props.user_id){
        return <Redirect to='/' />
    }

    return (

        <div>
            <div className='calendar-container-mealplan-currentweek' >
                <FullCalendar
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
                    resourceAreaWidth='8%'
                    contentHeight='auto'
                    events={events}
                    height='auto'
                    defaultTimedEventDuration={'00:01'}
                    header={
                        {center: 'title', left: ''}
                    }
                    eventClick={({event}) => {
                        changeDaySelected(null)
                        changeSelectedMeal({id: +event.id, title: event.title, date: event.start, mealType: event._def.resourceIds[0], nutritional_info: event.extendedProps.nutritional_info, isfollowed: event.extendedProps.isfollowed})}}
                    resourceLabelText={'Meal Type'}
                    />
            </div>
                <select  onChange={(e) => changeDaySelected(e.target.value)} >
                    <option value={''}>Select Day of the week</option>
                    <option value={moment().isoWeekday("Monday").format('DDD')} >{moment().isoWeekday("Monday").format('dddd, MMM DD')}</option>
                    <option value={moment().isoWeekday("Tuesday").format('DDD')} >{moment().isoWeekday("Tuesday").format('dddd, MMM DD')}</option>
                    <option value={moment().isoWeekday("Wednesday").format('DDD')} >{moment().isoWeekday("Wednesday").format('dddd, MMM DD')}</option>
                    <option value={moment().isoWeekday("Thursday").format('DDD')} >{moment().isoWeekday("THursday").format('dddd, MMM DD')}</option>
                    <option value={moment().isoWeekday("Friday").format('DDD')} >{moment().isoWeekday("Friday").format('dddd, MMM DD')}</option>
                    <option value={moment().isoWeekday("Saturday").format('DDD')} >{moment().isoWeekday("Saturday").format('dddd, MMM DD')}</option>
                    <option value={moment().isoWeekday("Sunday").format('DDD')} >{moment().isoWeekday("Sunday").format('dddd, MMM DD')}</option>
                </select>
                                

            { mealSelected ? <div className='meal-info-container'>
                    <p>{mealSelected.title} for {mealSelected.mealType}</p>
                    <p>{moment(mealSelected.date).format('ll')}</p>
                    <div>
                        <Radio.Group buttonStyle='solid' defaultChecked={mealSelected.isfollowed} value={mealSelected.isfollowed} >
                            <Radio.Button id='stuck-to-plan' value={true} onClick={() => changeIsFollowed(mealSelected.id, true) }> Stuck to Plan </Radio.Button>
                            <Radio.Button id='ate-out' value={false}  onClick={() => changeIsFollowed(mealSelected.id, false) }> Ate Out </Radio.Button>
                        </Radio.Group>
                    </div>
            </div> : <div> <p>Please Select A Meal</p></div>}

            <div>
                <ul className='nutrition-list'>
                    {mealSelected ? mealSelected.nutritional_info.slice(0, 9).map((ele, i) => {
                        return <li key={i}>{ele.title}: {ele.amount}{ele.unit}</li>
                    }) : null}
                </ul>

                    
                {altMealSelected? <ul className='nutrition-list' >
                    {props.altMealNutrition ? props.altMealNutrition.slice(0, 9).map((ele, i) => {
                        return <li key={i}>{ele.title}: {ele.amount}{ele.unit}</li>
                    }) : null}
                </ul> : null}
            </div>
                {plannedFollowed === false ? <div>
                    <div>
                        <input id='search-recipe' value={searchInput} onChange={e => changeInput(e.target.value)}  style = {{backgroundImage: `url(${props.searching ? searching : searchIcon})` }} />
                        <button onClick={() => {props.mealSearch(searchInput)}} >Search</button>
                    </div>
                        <ul className='alt-meals-list'>
                            {props.mealSearchResults.length ? props.mealSearchResults.map((ele, i) => {
                                return <li key={i} onClick={() => changeAltMeal(_.cloneDeep(ele))}>{ele.title} - {ele.restaurantChain}</li>
                            }) : null}
                        </ul>
                </div> : null}


            {mealSelected || daySelected ? <Bar className='graph' data={data} /> :null}
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return {
        user_id: reduxState.user.user_id,
        meals: reduxState.mealplan.meals,
        nutrition: reduxState.mealplan.nutrition,
        mealSearchResults: reduxState.mealplan.mealSearchResults,
        altMealNutrition: reduxState.mealplan.altMealNutrition,
        searching: reduxState.mealplan.mealSearching  
    }
}

export default connect(mapStateToProps, {changeIsFollowed, getNutrition, mealSearch, mealNutrition})(MealPlanExe) 