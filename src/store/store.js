import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './messagesReducer';

const store = configureStore({ 
    reducer: {messageList: messagesReducer} 
})

export default store;