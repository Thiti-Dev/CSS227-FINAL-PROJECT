import axios from 'axios'

import jwt_decode from 'jwt-decode'
import {SET_CURRENT_USER, GET_ERRORS, CLEAR_ERRORS, DUMMY_ACTION} from './types'
import setAuthToken from '../../utils/setAuthToken'

export const registerUser = (userData,callback, done) => dispatch => {
    axios.post('/api/user/register', userData)
        .then(res => {
            dispatch({
                type: CLEAR_ERRORS
            });
            dispatch({
                type:DUMMY_ACTION,
                payload: "registered"
            })
            //done();
            callback.onChangePage('/login',done);
            //history.push('/')
        })
        .catch(err => {
            //console.log(err);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            done(false, '👎');
        })
}

export const loginUser = (userData, callback,done) => dispatch => {
    //callback.setState({ proceed: true })
    axios.post('/api/user/login', userData)
        .then(res => {
            dispatch({
                type: CLEAR_ERRORS
            });
            // Save to localStorage
            const { token } = res.data;
            //Set token to ls
            localStorage.setItem('jwtToken', token);
            //Set token to Auth Header
            setAuthToken(token);
            //Decode token to get user data
            const decoded = jwt_decode(token);
            //Set current user
            dispatch(setCurrentUser(decoded));
            callback.onChangePage('/home',done);
            //done();
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            done(false, '👎');
        })
}

// Set logged in user
export const setCurrentUser = (decoeded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoeded
    }
}

// Log user out
export const logoutUser = () => dispatch => {
    //Remove token from localStorage
    localStorage.removeItem('jwtToken');
    //Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}))
}