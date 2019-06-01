import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE, SET_CURRENT_USER, GET_PROFILES } from './types'


//GET current Profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile')
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        })
}

// Get all Profiles
export const getProfiles = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile/all')
        .then(res => {
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_PROFILES,
                payload: null
            })
        })
}

// Profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

// Clear loading
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}