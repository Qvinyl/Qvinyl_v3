import { createReducer } from '@reduxjs/toolkit';
import { addMessage, clearMessages } from "./actions/messagesActions";

const initialState = { messages: [] };


const messagesReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addMessage, (state, action) => {
            state.messages.push(action.payload);
        })
        .addCase(clearMessages, (state, action) => {
           state.messages = []
        })
});
  
export default messagesReducer;