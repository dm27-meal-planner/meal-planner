import axios from 'axios'

const initialState = {
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

export function getMostLikedRecipe() {
   return {
      type: GET_MOST_LIKED_RECIPE,
      payload: axios.get('api/recipe/mostliked')
   }
}

export function getRecentRecipes() {
   return {
      type: GET_RECENT_RECIPE,
      payload: axios.get('api/recipe/recentlyadded')
   }
}

export function getUserRecipe(user_id) {
   return {
      type: GET_USER_RECIPE,
      payload: axios.get(`api/recipe/userrecipe/${user_id}`)
   }
}

export function getRecipeById(recipe_id) {
   return {
      type: GET_RECIPE_BY_ID,
      payload: axios.get(`api/recipe/${recipe_id}`)
   }
}

export function addRecipe(recipe) {
   return {
      type: ADD_RECIPE,
      payload: axios.post('api/recipe/addrecipe', recipe)
   }
}

export function deleteRecipe(recipe_id) {
   return {
      type: DELETE_RECIPE,
      payload: axios.delete(`api/recipe/${recipe_id}`)
   }
}

export function editRecipe(recipe_id, recipe) {
   return {
      type: EDIT_RECIPE,
      payload: axios.put(`api/recipe/editrecipe/${recipe_id}`, recipe)
   }
}

export function getRecipeByQuery(searchParams) {
   return {
      type: GET_RECIPE_BY_QUERY,
      // category = _____, name = ______
      payload: axios.get(`api/recipe/search?${searchParams}`)
   }
}

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