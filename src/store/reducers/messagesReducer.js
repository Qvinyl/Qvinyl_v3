import { createReducer } from '@reduxjs/toolkit';
import { addMessage, clearMessages, hasUnreadMessages } from "../actions/messagesActions";

const initialState = { 
    messages: [],
    hasUnreadNessages: false
};


const messagesReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addMessage, (state, action) => {
            state.messages.push(action.payload);
        })
        .addCase(clearMessages, (state, action) => {
           state.messages = []
        })
        .addCase(hasUnreadMessages, (state, action) => {
            state.hasUnreadNessages = action.payload
        })
});
  
export default messagesReducer;