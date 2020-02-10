import {createStore, combineReducers, applyMiddleware} from 'redux';
import promise from 'redux-promise-middleware';
import userReducer from './reducers/userReducer';
import fridgeReducer from './reducers/fridgeReducer';
import grocerylistReducer from './reducers/grocerylistReducer';
import ingredientsReducer from './reducers/ingredientsReducer';
import mealplanReducer from './reducers/mealplanReducer';
import recipeReducer from './reducers/recipeReducer';
import {firestoreReducer} from 'redux-firestore';
import {firebaseReducer} from 'react-redux-firebase';

const rootReducer = combineReducers({
   user: userReducer,
   fridge: fridgeReducer,
   grocerylist: grocerylistReducer,
   ingredients: ingredientsReducer,
   mealplan: mealplanReducer,
   recipe: recipeReducer
})

export default createStore(rootReducer, applyMiddleware(promise));