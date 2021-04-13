import {
    ANSWER_SUBMIT,
    GROUP_SUBMIT,
    LOADING_ANSWER,
    ANSWER_LOADED
} from '../actions/types';

const initialState = {
    isLoading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_ANSWER:
            return {
                ...state,
                isLoading: true
            };
        case ANSWER_SUBMIT:
            return {
                ...state,
                ...action.payload
            };
        case GROUP_SUBMIT:
            return {
                ...state,
                ...action.payload
            };
        case ANSWER_LOADED:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}