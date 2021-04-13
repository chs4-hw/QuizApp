import { USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_ERROR } from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuth: false,
    user: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuth: true,
                user: action.payload
            };
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuth: false
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuth: true
            };
        case LOGIN_ERROR:
        case REGISTER_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuth: false
            };
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuth: false
            };

        default:
            return state;
    }
}
