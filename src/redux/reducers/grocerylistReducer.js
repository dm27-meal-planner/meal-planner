import axios from 'axios';

const initialState = {
   list_id: null,
   ingredients: null
}

const GET_USER_GROCERY_LIST = "GET_USER_GROCERY_LIST";
const ADD_ITEM_TO_LIST = "ADD_ITEM_TO_LIST";
const EDIT_GROCERY_LIST = "EDIT_GROCERY_LIST";
const DELETE_GROCERY_ITEM = "DELETE_GROCERY_ITEM";

export function getUserGroceryList (list_id) {
   return {
      type: GET_USER_GROCERY_LIST,
      payload: axios.get(`api/grocerylist/${list_id}`)
   }
}

export function addItemToList (list_id, item) {
   //item is an ingredient, quantity, cost, title...
   return {
      type: ADD_ITEM_TO_LIST,
      payload: axios.post(`api/grocerylist/${list_id}`, item)
   }
}

// export function 

export default function reducer(state = initialState, action) {
   const {type, payload} = action;
   switch(type) {
      case `${GET_USER_GROCERY_LIST}_FULFILLED`:
         return {
            ...state,
         }
      case `${ADD_ITEM_TO_LIST}_FULFILLED`:
         return {
            ...state,
         }
      case `${EDIT_GROCERY_LIST}_FULFILLED`:
         return {
            ...state,
         }   
      case `${DELETE_GROCERY_ITEM}_FULFILLED`:
         return {
            ...state,
         }
      default: return state;   
   }
}