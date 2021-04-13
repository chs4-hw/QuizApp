import axios from 'axios';
import {
    ACTIVE_SESSION,
    LOADING,
    JOIN_SUCCESS,
    JOIN_ERROR,
    LEAVE,
    GET_ALERT,
} from './types';

import { createAlert } from './alertActions';

// Participant active with quiz
export const activeUser = () => (dispatch) => {

    const user_id = localStorage.getItem('user_id');

    axios.get(`/api/host/participant/${user_id}`)
        .then(res => {
            dispatch({
                type: ACTIVE_SESSION,
                payload: res.data,
            });
        }).catch(err => console.log(err));
}

// Participant join quiz
export const joinSession = ({ username, quiz_key }) => dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({ username, quiz_key });

    axios.post('/api/participant/register', body, config).then(res => {
        dispatch({
            type: JOIN_SUCCESS,
            payload: res.data,
        });
    }).catch(err => console.log(err));
}

export const logoutUser = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('isJoined');
    localStorage.removeItem('quiz_key');
    localStorage.removeItem('quiz_id');
}

