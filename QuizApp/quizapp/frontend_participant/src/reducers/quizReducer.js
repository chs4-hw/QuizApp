import {
    GET_QUIZ,
    QUIZ_OVER,
} from '../actions/types';

const initialState = {

};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_QUIZ:
            localStorage.setItem('quiz_id', action.payload.id);
            return {
                ...state,
                ...action.payload,
            };

        case QUIZ_OVER:
            localStorage.removeItem('quiz_key');
            localStorage.removeItem('quiz_id');
            return {
                ...state
            };
        default:
            return state;
    }
}
