import { combineReducers } from 'redux';
import messagesReducer from './messagesReducer';
import userReducer from './userReducer';
import queueReducer from './queueReducer';

const rootReducer = combineReducers({
    messagesReducer,
    userReducer,
    queueReducer
})

export default rootReducer;