// import axios from 'axios'

const initialState = {
    name: '',
    page: 1,
    mealType: '',
    cuisine: '',
    ingredient: '',
}

const SAVE_SEARCH_CONDITION = "SAVE_SEARCH_CONDITION";



export function saveSearchCondition(searchCondition) {
    console.log(searchCondition);
    
   return {
      type: SAVE_SEARCH_CONDITION,
      payload: searchCondition
   }
}
// export function getRecipeByQuery(searchParams) {
//    return {
//       type: GET_RECIPE_BY_QUERY,
//       // category = _____, name = ______
//       payload: axios.get(`/api/recipe/search?${searchParams}`)
//    }
// }

export default function reducer(state = initialState, action) {
   const {type, payload} = action;
//    console.log(type);
   
   switch (type) {
      case SAVE_SEARCH_CONDITION:
         return {
            ...state,
            ...payload
         };

      default: return state;
   }
}