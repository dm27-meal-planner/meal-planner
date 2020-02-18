import axios from 'axios'
import { compensateScroll } from '@fullcalendar/core'

const initialState = {
    meals: [],
    nutrition: [],
    searchResults: [],
    searching: false,
    categorySearching: false, 
    loading: true,
    categoryResults: [],
    autoCompleteResults: [],
    mealSearchResults: [],
    altMealNutrition:[],
    mealSearching: false

}

const GET_MEALS = 'GET_MEALS'
const ADD_MEAL = 'ADD_MEAL'
const EDIT_MEAL = 'EDIT_MEAL'
const DELETE_MEAL = 'DELETE_MEAL'
const CHANGE_IS_FOLLOWED = 'CHANGE_IS_FOLLOWED'
const GET_NUTRITION = 'GET_NUTRITION'
const SEARCH_RECIPES = 'SEARCH_RECIPES'
const SEARCH_BY_CATEGORY = 'SEARCH_BY_CATEGORY'
const AUTO_COMPLETE = 'AUTO_COMPLETE'
const MEAL_SEARCH = 'MEAL_SEARCH'
const MEAL_NUTRITION = 'MEAL_NUTRTITION'


export function getMealsForUser(userid){
    return {
        type: GET_MEALS,
        payload: axios.get(`/api/mealplan/${userid}`)
                    .then(res => res.data)
    }
}

export function addMeal(userid, newMeal){
    return {
        type:ADD_MEAL,
        payload: axios.post(`/api/mealplan/${userid}`, newMeal)
                    .then(res => res.data)
    }
}

export function editMeal(meal_id, editedMeal){
  return {
      type: EDIT_MEAL,
      payload: axios.put(`/api/mealplan/${meal_id}`, editedMeal)
                    .then( res => res.data)
  }
}

export function deleteMeal(meal_id, user_id){
  return{
    type: DELETE_MEAL,
    payload: axios.delete(`/api/mealplan/${meal_id}?user_id=${user_id}`)
                  .then(res => res.data)
  }
}

export function changeIsFollowed(meal_id, followed_plan){
  return{
    type: CHANGE_IS_FOLLOWED,
    payload: axios.put(`/api/mealplan/isfollowed/${meal_id}`, {followed_plan})
                  .then(res => res.data)
  }
}

export function getNutrition(){
  return {
    type: GET_NUTRITION,
    payload: axios.get('/api/mealplan/nutrition/pizza')
                .then(res => res.data)

  }
}

export function searchFunction(searchTerm, pageNumber){
  return {
    type: SEARCH_RECIPES,
    payload: axios.get(`/api/mealplan/search?searchTerm=${searchTerm}&pageNumber=${pageNumber}`)
                    .then(res => res.data)
  }
}

export function searchByCategory(category, pageNumber){
  return {
    type: SEARCH_BY_CATEGORY,
    payload: axios.get(`/api/search/category?cuisine=${category}&pageNumber=${pageNumber}`)
          .then(res => res.data)
  }
}

export function autoCompleteSearch(searchTerm){
  return{
      type: AUTO_COMPLETE,
      payload: axios.get(`/api/mealplan/search/autocomplete?searchTerm=${searchTerm}`)
                  .then(res => res.data)
  }
}

export function mealSearch(searchTerm){
  return{
    type: MEAL_SEARCH,
    payload: axios.get(`/api/mealplan/search/meal?searchTerm=${searchTerm}`)
              .then(res => res.data)
  }
}

export function mealNutrition(id){
  return{
    type: MEAL_NUTRITION,
    payload: axios.get(`/api/mealplan/meal/nutrition?id=${id}`)
    .then(res => res.data)
  }
}



export default function reducer(state = initialState, action){
    const { payload, type } = action

    switch(type){

        case `${GET_MEALS}_PENDING`: {
          return {
            ...state,
            loading: true
          }
        }
        case `${GET_MEALS}_FULFILLED`: {
          return {
            ...state,
            meals: payload,
            loading: false
          }
        }
        case `${GET_MEALS}_REJECTED`: {

          return {
            ...state,
            loading: false

          }
        }
        case `${ADD_MEAL}_FULFILLED`: {
          return {
            ...state,
            meals: payload
          }
        }
        case `${ADD_MEAL}_REJECTED`: {
          return {
            ...state
          }
        }
        case `${EDIT_MEAL}_FULFILLED`: {
          return {
            ...state,
            meals: payload
          }
        }
        case `${EDIT_MEAL}_REJECTED`: {
          return {
            ...state
          }
        }
        case `${DELETE_MEAL}_FULFILLED`: {
          return {
            ...state,
            meals: payload
          }
        }
        case `${DELETE_MEAL}_REJECTED`: {
          return {
            ...state
          }
        }
        case `${CHANGE_IS_FOLLOWED}_FULFILLED`: {
          let copy = state.meals.slice()

          copy.find(ele => payload[0].mealplan_id === ele.mealplan_id).followed_plan = payload[0].followed_plan

          return {
            ...state,
            meals: copy
          }
        }
        case `${CHANGE_IS_FOLLOWED}_REJECTED`: {
          return {
            ...state
          }
        }
        case `${GET_NUTRITION}_FULFILLED`: {
          return {
            ...state,
            nutrition: payload
          }
        }

        case `${SEARCH_RECIPES}_PENDING`: {
          return {
            ...state,
            searching: true,
          }
        }
        case `${SEARCH_RECIPES}_FULFILLED`: {
          console.log(payload)
          return {
            ...state,
            searching: false,
            searchResults: payload.results
          }
        }
        case `${SEARCH_RECIPES}_REJECTED`: {
          return {
            ...state,
            searching: false,
            searchResults: payload
          }
        }
        case `${SEARCH_BY_CATEGORY}_PENDING`: {
          return {
              ...state,
              categorySearching: true
          }
        }
        case `${SEARCH_BY_CATEGORY}_FULFILLED`: {
          return {
            ...state,
            categorySearching: false,
            categoryResults: payload.results
          }
        }
        case `${SEARCH_BY_CATEGORY}_REJECTED`: {
          return {
            ...state,
            categorySearching: false,
          }
        }

        case `${AUTO_COMPLETE}_PENDING`: {
          return {
            ...state
          }
        }

        case `${AUTO_COMPLETE}_FULFILLED`: {
          return {
            ...state,
            autoCompleteResults: payload
          }
        }
        case `${AUTO_COMPLETE}_REJECTED`: {
          return {
            ...state
          }
        }

        case `${MEAL_SEARCH}_PENDING`: {
          return {
            ...state,
            mealSearching: true
          }
        }
        case `${MEAL_SEARCH}_FULFILLED`: {
          return {
            ...state,
            mealSearchResults: payload.menuItems,
            mealSearching: false
          }
        }
        case `${MEAL_SEARCH}_REJECTED`: {
          return {
            ...state,
            mealSearching: false
          }
        }
        case `${MEAL_NUTRITION}_PENDING`: {
          return {
            ...state
          }
        }
        case `${MEAL_NUTRITION}_FULFILLED`: {
          return {
            ...state,
            altMealNutrition: payload.nutrients
          }
        }
        case `${MEAL_NUTRITION}_REJECTED`: {
          return {
            ...state
          }
        }

        default:
            return state
    }

}