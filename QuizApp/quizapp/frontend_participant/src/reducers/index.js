import { combineReducers as rootReducer } from 'redux';
import userReducer from './userReducer';
import alertReducer from './alertReducer';
import quizReducer from './quizReducer';
import questionReducer from './questionReducer';
import answerReducer from './answerReducer';

// Redux Root Reducer
export default rootReducer({
    userReducer: userReducer,
    alertReducer: alertReducer,
    quizReducer: quizReducer,
    questionReducer: questionReducer,
    answerReducer: answerReducer,
});
