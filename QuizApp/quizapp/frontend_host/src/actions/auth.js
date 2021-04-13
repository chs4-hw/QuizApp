import axios from 'axios';
import { USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_ERROR } from './types';



export const loadUser = () => (dispatch, getState) => {

    const token = getState().authReducer.token;

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    };

    axios.get('/api/auth/user', config).then(res => {
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    }).catch(err => console.log(err));

}

export const loginUser = (username, password) => (dispatch) => {

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({ username, password })

    axios.post('/api/auth/login', body, config).then(res => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
    }).catch(err => console.log(err));

}

export const registerUser = ({ username, email, password }) => (dispatch) => {

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({ username, email, password })

    axios.post('api/auth/register', body, config).then(res => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        });
    }).catch(err => dispatch({ type: REGISTER_ERROR }));

}

export const logoutUser = () => (dispatch, getState) => {

    const token = getState().authReducer.token;

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    axios.get('/api/auth/logout', null, config).then(res => {
        dispatch({
            type: LOGOUT_SUCCESS
        });
    }).catch(err => dispatch({ type: LOGOUT_SUCCESS }));

}
