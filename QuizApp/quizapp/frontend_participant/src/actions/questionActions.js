import axios from 'axios';
import {
    GET_QUESTION,
    QUESTION_BORDER,
    LOADING_QUESTION,
    UPDATE_QUESTION
} from '../actions/types';

export const startQuestion = () => (dispatch) => {

    dispatch({ type: LOADING_QUESTION});

    const quiz_id = localStorage.getItem('quiz_id');

    axios.get(`/api/participant/questions?quiz_id=${quiz_id}`)
        .then(res => {
            dispatch({
                type: GET_QUESTION,
                payload: res.data
            });
        }).catch(err => console.log(err));
}

export const navQuestion = (url) => (dispatch) => {

    dispatch({ type: LOADING_QUESTION});

    if (url == null) {
        dispatch({
            type: QUESTION_BORDER
        })
    } else {
        axios.get(url)
            .then(res => {
                dispatch({
                    type: GET_QUESTION,
                    payload: res.data
                });
            }).catch(err => console.log(err));
    }
}

export const activeQuestion = (str) => (dispatch, getState) => {
    
    dispatch({ type: LOADING_QUESTION});

    let url = '';
    const quiz_id = localStorage.getItem('quiz_id');

    if (str == null) {
        let lastPage = getState().questionReducer.count;
        url = `/api/participant/questions?page=${lastPage}&quiz_id=${quiz_id}`;

    } else {

        let patt = /(?<=\=)(.*?)(?=\&)/;
        let num = str.match(patt);
        let page = num[0] - 1;

        url = `/api/participant/questions?page=${page}&quiz_id=${quiz_id}`;
    }
    axios.get(url)
        .then(res => {
            dispatch({
                type: UPDATE_QUESTION,
                payload: res.data
            });
        }).catch(err => console.log(err));

}
