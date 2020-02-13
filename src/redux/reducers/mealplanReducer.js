import axios from 'axios'

const initialState = {
    meals: [],
    loading: true
}

const GET_MEALS = 'GET_MEALS'
const ADD_MEAL = 'ADD_MEAL'
const EDIT_MEAL = 'EDIT_MEAL'
const DELETE_MEAL = 'DELETE_MEAL'


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

// export function editMeal(mealid, editedMeal)

// export function deleteMeal(mealid)

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

        default:
            return state
    }

}