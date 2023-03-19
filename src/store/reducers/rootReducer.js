import { combineReducers } from 'redux';
import messagesReducer from './messagesReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    messagesReducer,
    userReducer
})

export default rootReducer;