import axios from 'axios'

initialState = {
   recentlyAddedRecipes: [],
   userRecipes: [],
   mostLiked: [],
   searchResults: []
}

const GET_MOST_LIKED_RECIPE = "GET_MOST_LIKED_RECIPE";
const GET_RECENT_RECIPE = "GET_RECENT_RECIPE";
const GET_USER_RECIPE = "GET_USER_RECIPE";
const GET_RECIPE_BY_ID = "GET_RECIPE_BY_ID";
const ADD_RECIPE = "ADD_RECIPE";
const DELETE_RECIPE = "DELETE_RECIPE";
const EDIT_RECIPE = "EDIT_RECIPE";
const GET_RECIPE_BY_QUERY = "GET_RECIPE_BY_QUERY";

export default function reducer(state = initialState, action) {
   const {type, payload} = action;
   switch (type) {
      case `${GET_MOST_LIKED_RECIPE}_FULFILLED`:
         return {
               ...state,
         };
      case `${GET_RECENT_RECIPE}_FULFILLED`:
         return {
            ...state,
         };
      case `${GET_USER_RECIPE}_FULFILLED`:
         return {
            ...state,
         };
      case `${GET_RECIPE_BY_ID}_FULFILLED`:
         return {
            ...state,
         };
      case `${ADD_RECIPE}_FULFILLED`:
         return {
            ...state,
         };
      case `${DELETE_RECIPE}_FULFILLED`:
         return {
            ...state,
         };
      case `${EDIT_RECIPE}_FULFILLED`:
         return {
            ...state,
         };
      case `${GET_RECIPE_BY_QUERY}_FULFILLED`:
         return {
            ...state,
         };
      default: return state;
   }
}