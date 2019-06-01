import isEmpty from '../../validation/is-empty'
import { DUMMY_ACTION } from '../actions/types';

const initialState = {
    isWork: "yes",
    currentEvent: "whatever"
}

export default function (state = initialState, action) {
    switch (action.type) {
        case DUMMY_ACTION:
            return {
                ...state,
                currentEvent: action.payload
            }
        default:
            return state;
    }
}