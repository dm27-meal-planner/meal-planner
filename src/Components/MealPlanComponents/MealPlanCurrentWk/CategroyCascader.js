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
            props.categorySelected(categorySelected)
        }

        changeCategory(null)
    })

    
    let options = [
        {
            value: 'African',
            label: 'African'
        },
        {
            value: 'American',
            label: 'American'
        },
        {
            value: 'British',
            label: 'British'
        },
        {
            value: 'Cajun',
            label: 'Cajun'
        },
        {
            value: 'Caribbean',
            label: 'Caribbean'
        },
        {
            value: 'Chinese',
            label: 'Chinese'

        },
        {
            value: 'Eastern European',
            label: 'Eastern European'

        },
        {
            value: 'European',
            label: 'European'

        },
        {
            value: 'French',
            label: 'French'

        },
        {
            value: 'German',
            label: 'German'

        },
        {
            value: 'Greek',
            label: 'Greek'

        },
        {
            value: 'Indian',
            label: 'Indian'

        },
        {
            value: 'Irish',
            label: 'Irish'

        },
        {
            value: 'Italian',
            label: 'Italian'

        },
        {
            value: 'Japanese',
            label: 'Japanese'

        },
        {
            value: 'Jewish',
            label: 'Jewish'

        },
        {
            value: 'Korean',
            label: 'Korean'

        },
        {
            value: 'Latin American',
            label: 'Latin American'

        },
        {
            value: 'Mediterranean',
            label: 'Mediterranean'
        },
        {
            value: 'Mexican',
            label: 'Mexican'

        },
        {
            value: 'Middle Eastern',
            label: 'Middle Eastern'
        },
        {
            value: 'Nordic',
            label: 'Nordic'
        },
        {
            value: 'Southern',
            label: 'Southern'
        },
        {
            value: 'Spanish',
            label: 'Spanish'
        },
        {
            value: 'Thai',
            label: 'Thai'

        },
        {
            value: 'Vietnamese',
            label: 'Vietnamese'

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
            <Cascader options={options} onChange={onChange} value={[]} changeOnSelect placeholder="Browse By Cuisine" />

    )
}

const mapStateToProps = (reduxState) => {
    return {
        categoryResults: reduxState.mealplan.categoryResults,
        categorySearching: reduxState.mealplan.categorySearching
    }
}

export default connect(mapStateToProps, {searchByCategory})(CategoryCascader)