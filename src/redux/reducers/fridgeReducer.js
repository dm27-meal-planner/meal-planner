import axios from 'axios'

const initialState = {
   fridge_id: null,
   //console ingredients
   ingredients: null
}

const GET_USER_FRIDGE = "GET_USER_FRIDGE";
const ADD_ITEM = "ADD_ITEM";
const EDIT_ITEM = "EDIT_ITEM";
const DELETE_ITEM = "DELETE_ITEM";

export function getUserFridge(user_id) {
   return {
      type: GET_USER_FRIDGE,
      payload: axios.get(`api/fridge/${user_id}`)
   }
}

export function addItem(user_id, item) {
   return {
      type: ADD_ITEM,
      payload: axios.post(`api/fridge/${user_id}`, item)
   }
}

export function editItem(user_id, item_id, item) {
   return {
      type: EDIT_ITEM,
      payload: axios.put(`api/fridge/${user_id}?item=${item_id}`, item)
   }
}

export function deleteItem(user_id, item_id) {
   return {
      type: DELETE_ITEM,
      payload: axios.delete(`api/fridge/${user_id}?item=${item_id}`)
   }
}

export default function reducer(state = initialState, action) {
   const {type, payload} = action;
   switch(type) {
      case `${GET_USER_FRIDGE}_FULFILLED`:
         console.log(payload.data.ingredients);
         return {
            ...state,
            fridge_id: payload.data.fridge_id,
            // ingredients is an array of objects; each object is an 
            // ingredient in the fridge
            ingredients: payload.data.ingredients
         }
      case `${ADD_ITEM}_FULFILLED`:
         return {
            ...state,
            fridge_id: payload.data.fridge_id,
            ingredients: payload.data.ingredients
         }
      case `${EDIT_ITEM}_FULFILLED`:
         return {
            ...state,
            fridge_id: payload.data.fridge_id,
            ingredients: payload.data.ingredients
         }
      case `${DELETE_ITEM}_FULFILLED`:
         return {
            ...state,
            fridge_id: payload.data.fridge_id,
            ingredients: payload.data.ingredients
         }
      default: return state;
   }
}