import {createStore, combineReducers, applyMiddleware} from 'redux';
import promise from 'redux-promise-middleware';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
   user: userReducer
})

export default createStore(rootReducer, applyMiddleware(promise));