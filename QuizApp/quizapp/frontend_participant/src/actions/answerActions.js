import axios from 'axios';
import {
    ANSWER_SUBMIT,
    GROUP_SUBMIT,
    LOADING_ANSWER,
    ANSWER_LOADED
} from '../actions/types';

export const answerSubmit = (answer_a, answer_b, answer_c, answer_d, group_quiz) => (dispatch, getState) => {

    dispatch({ type: LOADING_ANSWER });

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const question_id = getState().questionReducer.results && getState().questionReducer.results.map(entry => entry.id).toString();

    if (group_quiz) {

        let groupvote_a = getState().questionReducer.results && getState().questionReducer.results.map(entry => entry.groupvote_a).toString();
        let groupvote_b = getState().questionReducer.results && getState().questionReducer.results.map(entry => entry.groupvote_b).toString();
        let groupvote_c = getState().questionReducer.results && getState().questionReducer.results.map(entry => entry.groupvote_c).toString();
        let groupvote_d = getState().questionReducer.results && getState().questionReducer.results.map(entry => entry.groupvote_d).toString();

        if (answer_a) { ++groupvote_a; }
        if (answer_b) { ++groupvote_b; }
        if (answer_c) { ++groupvote_c; }
        if (answer_d) { ++groupvote_d; }

        const question = getState().questionReducer.results && getState().questionReducer.results.map(entry => entry.question).toString();

        const body = JSON.stringify({ question, groupvote_a, groupvote_b, groupvote_c, groupvote_d });

        axios.patch(`/api/participant/group_submit/${question_id}`, body, config).then(res => {
            dispatch({
                type: GROUP_SUBMIT,
                payload: res.data,
            });
            dispatch({ type: ANSWER_LOADED });
        }).catch(err => console.log(err));
    }

    const participant = localStorage.getItem('user_id');

    const body = JSON.stringify({ answer_a, answer_b, answer_c, answer_d, participant, question_id });

    axios.post('/api/participant/answers/', body, config).then(res => {
        dispatch({
            type: ANSWER_SUBMIT,
            payload: res.data,
        });
    }).catch(err => console.log(err));
}