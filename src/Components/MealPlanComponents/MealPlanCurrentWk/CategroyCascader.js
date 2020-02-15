import React, {useState, useEffect} from 'react'
import { Cascader } from 'antd';
import { connect } from 'react-redux';
import {searchByCategory} from '../../../redux/reducers/mealplanReducer'
import categorySearching from '../../../animations/CategorySearching.gif'
import _ from 'lodash'


const CategoryCascader = (props) => {

    const [categorySelected, changeCategory] = useState(null)

    useEffect( () => {
        console.log(categorySelected)

        if(categorySelected){
             props.searchByCategory(categorySelected)
        }
    }, [categorySelected])

    console.log(categorySelected)
    console.log(props)
    
    let options = [
        {
            value: 'African',
            label: 'African',
            children: props.categorySearching ? [{label: <img src={categorySearching} alt='loading'/>}] : categorySelected === 'African' ? props.categoryResults.map((ele) =>{return {label: ele.title, value: _.cloneDeep({id: ele.id, title: ele.title, extendedProps:{ image: `https://spoonacular.com/recipeImages/${ele.image}`}})}}): [{value: ''}]
        },
        {
            value: 'American',
            label: 'American',
            children: props.categorySearching ? [{label: <img src={categorySearching} alt='loading'/>}] : categorySelected === 'American' ? props.categoryResults.map((ele) =>{return {label: ele.title, value: _.cloneDeep({id: ele.id, title: ele.title, extendedProps:{ image: `https://spoonacular.com/recipeImages/${ele.image}`}})}}): [{value: ''}]

        },
        {
            value: 'British',
            label: 'British',
            children: props.categorySearching ? [{label: <img src={categorySearching} alt='loading'/>}] : categorySelected === 'British' ? props.categoryResults.map((ele) =>{return {label: ele.title, value: _.cloneDeep({id: ele.id, title: ele.title, extendedProps:{ image: `https://spoonacular.com/recipeImages/${ele.image}`}})}}): [{value: ''}]
        },
        {
            value: 'Cajun',
            label: 'Cajun',
            children: props.categorySearching ? [{label: <img src={categorySearching} alt='loading'/>}] : categorySelected === 'Cajun' ? props.categoryResults.map((ele) =>{return {label: ele.title, value: ele.title}}): [{value: ''}]
        },
        {
            value: 'Caribbean',
            label: 'Caribbean',
            children: props.categorySearching ? [{label: <img src={categorySearching} alt='loading'/>}] : categorySelected === 'Caribbean' ? props.categoryResults.map((ele) =>{return {label: ele.title, value: ele.title}}): [{value: ''}]
        },
        {
            value: 'Chinese',
            label: 'Chinese',
            children: props.categorySearching ? [{label: <img src={categorySearching} alt='loading'/>}] : categorySelected === 'Chinese' ? props.categoryResults.map((ele) =>{return {label: ele.title, value: ele.title}}): [{value: ''}]

        },
        {
            value: 'Eastern European',
            label: 'Eastern European',
            children: props.categorySearching ? [{label: <img src={categorySearching} alt='loading'/>}] : categorySelected === 'Eastern European' ? props.categoryResults.map((ele) =>{return {label: ele.title, value: ele.title}}): [{value: ''}]

        },
        {
            value: 'European',
            label: 'European',
            children: props.categorySearching ? [{label: <img src={categorySearching} alt='loading'/>}] : categorySelected === 'European' ? props.categoryResults.map((ele) =>{return {label: ele.title, value: ele.title}}): [{value: ''}]

        },
        {
            value: 'French',
            label: 'French',
            children: props.categorySearching ? [{label: <img src={categorySearching} alt='loading'/>}] : categorySelected === 'French' ? props.categoryResults.map((ele) =>{return {label: ele.title, value: ele.title}}): [{value: ''}]

        },
        {
            value: 'German',
            label: 'German',
            children: props.categorySearching ? [{label: <img src={categorySearching} alt='loading'/>}] : categorySelected === 'German' ? props.categoryResults.map((ele) =>{return {label: ele.title, value: ele.title}}): [{value: ''}]

        },
        {
            value: 'Greek',
            label: 'Greek',
            children: props.categorySearching ? [{label: <img src={categorySearching} alt='loading'/>}] : categorySelected === 'Greek' ? props.categoryResults.map((ele) =>{return {label: ele.title, value: ele.title}}): [{value: ''}]

        },
        {
            value: 'Indian',
            label: 'Indian',
            children: props.categorySearching ? [{label: <img src={categorySearching} alt='loading'/>}] : categorySelected === 'Indian' ? props.categoryResults.map((ele) =>{return {label: ele.title, value: ele.title}}): [{value: ''}]

        },
        {
            value: 'Irish',
            label: 'Irish',
            children: props.categorySearching ? [{label: <img src={categorySearching} alt='loading'/>}] : categorySelected === 'Irish' ? props.categoryResults.map((ele) =>{return {label: ele.title, value: ele.title}}): [{value: ''}]

        },
        {
            value: 'Italian',
            label: 'Italian',
            children: props.categorySearching ? [{label: <img src={categorySearching} alt='loading'/>}] : categorySelected === 'Italian' ? props.categoryResults.map((ele) =>{return {label: ele.title, value: ele.title}}): [{value: ''}]

        },
        {
            value: 'Japanese',
            label: 'Japanese',
            children: props.categorySearching ? [{label: <img src={categorySearching} alt='loading'/>}] : categorySelected === 'Japanese' ? props.categoryResults.map((ele) =>{return {label: ele.title, value: ele.title}}): [{value: ''}]

        },
        {
            value: 'Jewish',
            label: 'Jewish',
            children: props.categorySearching ? [{label: <img src={categorySearching} alt='loading'/>}] : categorySelected === 'Jewish' ? props.categoryResults.map((ele) =>{return {label: ele.title, value: ele.title}}): [{value: ''}]

        },
        {
            value: 'Korean',
            label: 'Korean',
            children: props.categorySearching ? [{label: <img src={categorySearching} alt='loading'/>}] : categorySelected === 'Korean' ? props.categoryResults.map((ele) =>{return {label: ele.title, value: ele.title}}): [{value: ''}]

        },
        {
            value: 'Latin American',
            label: 'Latin American',
            children: props.categorySearching ? [{label: <img src={categorySearching} alt='loading'/>}] : categorySelected === 'Latin American' ? props.categoryResults.map((ele) =>{return {label: ele.title, value: ele.title}}): [{value: ''}]

        },
        {
            value: 'Mediterranean',
            label: 'Mediterranean',
            children: props.categorySearching ? [{label: <img src={categorySearching} alt='loading'/>}] : categorySelected === 'Mediterranean' ? props.categoryResults.map((ele) =>{return {label: ele.title, value: ele.title}}): [{value: ''}]
        },
        {
            value: 'Mexican',
            label: 'Mexican',
            children: props.categorySearching ? [{label: <img src={categorySearching} alt='loading'/>}] : categorySelected === 'Mexican' ? props.categoryResults.map((ele) =>{return {label: ele.title, value: ele.title}}): [{value: ''}]

        },
        {
            value: 'Middle Eastern',
            label: 'Middle Eastern',
            children: props.categorySearching ? [{label: <img src={categorySearching} alt='loading'/>}] : categorySelected === 'Middle Eastern' ? props.categoryResults.map((ele) =>{return {label: ele.title, value: ele.title}}): [{value: ''}]


        },
        {
            value: 'Nordic',
            label: 'Nordic',
            children: props.categorySearching ? [{label: <img src={categorySearching} alt='loading'/>}] : categorySelected === 'Nordic' ? props.categoryResults.map((ele) =>{return {label: ele.title, value: ele.title}}): [{value: ''}]

        },
        {
            value: 'Southern',
            label: 'Southern',
            children: props.categorySearching ? [{label: <img src={categorySearching} alt='loading'/>}] : categorySelected === 'Southern' ? props.categoryResults.map((ele) =>{return {label: ele.title, value: ele.title}}): [{value: ''}]

        },
        {
            value: 'Spanish',
            label: 'Spanish',
            children: props.categorySearching ? [{label: <img src={categorySearching} alt='loading'/>}] : categorySelected === 'Spanish' ? props.categoryResults.map((ele) =>{return {label: ele.title, value: ele.title}}): [{value: ''}]

        },
        {
            value: 'Thai',
            label: 'Thai',
            children: props.categorySearching ? [{label: <img src={categorySearching} alt='loading'/>}] : categorySelected === 'Thai' ? props.categoryResults.map((ele) =>{return {label: ele.title, value: ele.title}}): [{value: ''}]

        },
        {
            value: 'Vietnamese',
            label: 'Vietnamese',
            children: props.categorySearching ? [{label: <img src={categorySearching} alt='loading'/>}] : categorySelected === 'Thai' ? props.categoryResults.map((ele) =>{return {label: ele.title, value: ele.title}}): [{value: ''}]

        }
    ]

    const onChange = (value) => {

        if(typeof value[0] === 'string' && typeof value[1] === 'object'){
            props.selectRecipe(value[1])
        } else if (typeof value[0] === 'string'){
            changeCategory(...value)
      }
    }
    

    return(
        <Cascader options={options} onChange={onChange} changeOnSelect placeholder="Browse By Cuisine" />

    )
}

const mapStateToProps = (reduxState) => {
    return {
        categoryResults: reduxState.mealplan.categoryResults,
        categorySearching: reduxState.mealplan.categorySearching
    }
}

export default connect(mapStateToProps, {searchByCategory})(CategoryCascader)