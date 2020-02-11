import axios from 'axios';

const initialState = {
   username: null,
   // is_Admin: false,
   email: null,
   user_id: null,
   household_size: null,
   message: '',
   uid: null
}

//action types
const GET_USER = 'GET_USER';
const LOGIN_USER = 'LOGIN_USER';
const REGISTER_USER = 'REGISTER_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const REGISTER_FIREBASE = 'REGISTER_FIREBASE';
const LOGIN_FIREBASE = 'LOGIN_FIREBASE';
const EDIT_USER = 'EDIT_USER';

export function getUser() {
   return {
      type: GET_USER,
      payload: axios.get('/user/getuser')
   }
}

export function loginUser(username, password) {
   // send an object into the body of the axios request
   let user = {username, password};
   return {
      type: LOGIN_USER,
      payload: axios.post('/user/login', user)
   }
}

export function registerUser(username, password, email, first_name, last_name, noPpl) {
   //household size should be a selectable dropdown in the register component.
   let household_size = parseInt(noPpl);
   let user = {username, password, email, first_name, last_name, household_size};
   return {
      type: REGISTER_USER,
      payload: axios.post('/user/registeruser', user)
   }
} 

export function registerFirebase(username, email, uid) {
   let user = {username: username, email: email, household_size: 1, uid: uid}
   return {
      type: REGISTER_FIREBASE,
      payload: axios.post('/firebase/register', user)
   }
}

export function loginFirebase(uid) {
   return {
      type: LOGIN_FIREBASE,
      payload: axios.post('/firebase/login', {uid})
   }
}

export function editUser(username, password, email, first_name, last_name, noPpl, uid) {
   return {
      type: EDIT_USER,
      payload: null
   }
}

export function logoutUser() {
   return {
      type: LOGOUT_USER,
      payload: axios.post('/user/logout')
   }
}

export default function reducer(state = initialState, action) {
   //action.payload refers to what is being received due to the store function 
   //(check return {payload: axios.something})
   const {type, payload} = action;
   switch(type) {
      case `${GET_USER}_FULFILLED`:
         return {
            ...state,
            username: payload.data.username,
            user_id: payload.data.user_id,
            email: payload.data.email,
            household_size: payload.data.household_size,
            uid: payload.data.uid,
            message: ''
         }
      case `${GET_USER}_REJECTED`: {
         return {
            ...state,
            message: payload.response.data
         }
      }
      case `${REGISTER_FIREBASE}_FULFILLED`: {
         return {
            ...state,
            username: payload.data.username,
            user_id: payload.data.user_id,
            email: payload.data.email,
            household_size: payload.data.household_size,
            uid: payload.data.uid,
            message: ''
         }
      }
      case `${LOGIN_FIREBASE}_FULFILLED`: {
         return {
            ...state,
            username: payload.data.username,
            user_id: payload.data.user_id,
            email: payload.data.email,
            household_size: payload.data.household_size,
            uid: payload.data.uid,
            message: ''
         }
      }
      case `${LOGIN_USER}_FULFILLED`:
         return {
            ...state,
            username: payload.data.username,
            user_id: payload.data.user_id,
            email: payload.data.email,
            household_size: payload.data.household_size,
            uid: payload.data.uid,
            message: `${payload.data.username} is currently logged in`
         }
      case `${REGISTER_USER}_FULFILLED`:
         return {
            ...state,
            username: payload.data.username,
            user_id: payload.data.user_id,
            email: payload.data.email,
            household_size: payload.data.household_size,
            uid: payload.data.uid,
            message: 'Account created successfully.'
         }
      case `${LOGOUT_USER}_FULFILLED`:
         return {
            ...state,
            username: null,
            user_id: null,
            email: null,
            household_size: null,
            uid: null,
            message: 'Successfully logged out!'
         }
      default: return state;
   }
}