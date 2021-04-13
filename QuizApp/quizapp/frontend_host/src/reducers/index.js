import { combineReducers } from 'redux';
import authReducer from './authReducer';

// Redux 
export default combineReducers({
    authReducer: authReducer,

});
