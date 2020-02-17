import axios from 'axios'

const initialState = {
   ingredients: []
}

const GET_USER_FRIDGE = "GET_USER_FRIDGE";
const ADD_ITEM = "ADD_ITEM";
const EDIT_ITEM = "EDIT_ITEM";
const DELETE_ITEM = "DELETE_ITEM";
const EMPTY_FRIDGE = "EMPTY_FRIDGE";

export function getUserFridge(user_id) {
   return {
      type: GET_USER_FRIDGE,
      payload: axios.get(`api/fridge/${user_id}`)
   }
}

export function addItem(user_id, list) {
   return {
      type: ADD_ITEM,
      payload: axios.post(`api/fridge/${user_id}`, list)
   }
}

export function editItem(user_id, item_id, item) {
   return {
      type: EDIT_ITEM,
      payload: axios.put(`api/fridgeitem/${user_id}`, {data: {item_id, item}})
   }
}

export function deleteItem(user_id, item_id) {
   return {
      type: DELETE_ITEM,
      // the data type to pass data in an express delete/get request must be an object (array)
      payload: axios.delete(`api/fridgeitem/${user_id}`, {data: {item_id}})
   }
}

export function emptyFridge(user_id) {
   return {
      type: EMPTY_FRIDGE,
      payload: axios.delete(`api/fridge/${user_id}`)
   }
}

export default function reducer(state = initialState, action) {
   const {type, payload} = action;
   switch(type) {
      case `${GET_USER_FRIDGE}_FULFILLED`:
         return {
            ...state,
            ingredients: payload.data
         }
      case `${ADD_ITEM}_FULFILLED`:
         return {
            ...state,
            ingredients: payload.data
         }
      case `${EDIT_ITEM}_FULFILLED`:
         return {
            ...state,
            ingredients: payload.data
         }
      case `${DELETE_ITEM}_FULFILLED`:
         return {
            ...state,
            // ingredients: payload.data
         }
      case `${EMPTY_FRIDGE}_FULFILLED`:
         return {
            ...state,
            ingredients: payload.data
         }
      default: return state;
   }
}