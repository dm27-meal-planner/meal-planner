import axios from 'axios';

const initialState = {
   ingredients: []
}

const GET_USER_GROCERY_LIST = "GET_USER_GROCERY_LIST";
const ADD_ITEM_TO_LIST = "ADD_ITEM_TO_LIST";
const EDIT_GROCERY_LIST = "EDIT_GROCERY_LIST";
const DELETE_GROCERY_ITEM = "DELETE_GROCERY_ITEM";

export function getUserGroceryList (user_id) {
   return {
      type: GET_USER_GROCERY_LIST,
      payload: axios.get(`api/grocerylist/${user_id}`)
   }
}

export function addItemToList (user_id, list) {
   //list is an array of objects; each object is an ingredient in the list
   return {
      type: ADD_ITEM_TO_LIST,
      payload: axios.post(`api/grocerylist/${user_id}`, list)
   }
}

export default function reducer(state = initialState, action) {
   const {type, payload} = action;
   switch(type) {
      case `${GET_USER_GROCERY_LIST}_FULFILLED`:
         console.log(payload.data);
         return {
            ...state,
            ingredients: payload.data
         }
      case `${ADD_ITEM_TO_LIST}_FULFILLED`:
         return {
            ...state,
            ingredients: payload.data
         }
      case `${EDIT_GROCERY_LIST}_FULFILLED`:
         return {
            ...state,
            ingredients: payload.data
         }   
      case `${DELETE_GROCERY_ITEM}_FULFILLED`:
         return {
            ...state,
            ingredients: payload.data
         }
      default: return state;   
   }
}