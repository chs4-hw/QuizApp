import {
    GET_QUESTION,
    QUESTION_BORDER,
    GET_NEXT_QUESTION,
    LOADING_QUESTION,
    UPDATE_QUESTION
} from '../actions/types';

const initialState = {
    isLoading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_QUESTION:
            return {
                ...state,
                isLoading: true
            };
        case UPDATE_QUESTION:
        case GET_QUESTION:
            return {
                ...state,
                isLoading: false,
                ...action.payload,
            };
        case GET_NEXT_QUESTION:
            return {
                ...state,
            };
        case QUESTION_BORDER:
            return {
                ...state,
            };
        default:
            return state;
    }
}
