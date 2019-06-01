import { combineReducers } from 'redux';
import globalReducer from './globalReducer'
import authReducer from './authReducers'
import errorReducer from './errorReducers'
import profileReducer from './profileReducer'

export default combineReducers({
    errors:errorReducer,
    auth: authReducer,
    global: globalReducer,
    profile: profileReducer
})