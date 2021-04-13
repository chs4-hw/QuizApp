import axios from 'axios';
import {
    GET_QUIZ,
    GET_NEXT_QUESTION,
    QUIZ_OVER,
} from '../actions/types';

export const loadQuiz = () => (dispatch) => {

    const quiz_key = localStorage.getItem('quiz_key');

    axios.get(`/api/participant/quiz/${quiz_key}`)
        .then(res => {
            dispatch({
                type: GET_QUIZ,
                payload: res.data
            });
        }).catch(err => console.log(err));
}


