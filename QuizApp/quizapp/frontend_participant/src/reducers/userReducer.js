import {
    ACTIVE_SESSION,
    LOADING,
    JOIN_SUCCESS,
    JOIN_ERROR,
    LEAVE
} from '../actions/types';

const initialState = {
    //user_id: localStorage.getItem('user_id'),
    isJoined: false,
    loading: false,
    id: null,
    username: null,
    //quiz_key: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: true
            };
        case ACTIVE_SESSION:
        case JOIN_SUCCESS:
            //localStorage.setItem('quiz_key', action.payload.quiz_key);
            localStorage.setItem('user_id', action.payload.id);
            localStorage.setItem('isJoined', true);
            localStorage.setItem('quiz_key', action.payload.quiz_key);
            return {
                ...state,
                ...action.payload,
                isJoined: true,
                loading: false,
                //user: action.payload
            };
        case JOIN_ERROR:
            //localStorage.removeItem('quiz_key');
            localStorage.removeItem('user_id');
            localStorage.removeItem('isJoined');
            localStorage.removeItem('quiz_key');
            return {
                ...state,
                //quiz_key: null,
                //user: null,
                isJoined: false,
                loading: false,
            };
        case LEAVE:
            localStorage.removeItem('user_id');
            localStorage.removeItem('isJoined');
            localStorage.removeItem('quiz_key');
            localStorage.removeItem('quiz_key');
            return {
                ...state,
                //quiz_key: null,
                //user: null,
                isJoined: false
            };
        default:
            return state;
    }
}
