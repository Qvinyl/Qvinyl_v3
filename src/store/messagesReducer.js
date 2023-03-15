import { createReducer } from '@reduxjs/toolkit';
import { addMessage } from "./actions/messagesActions";

const initialState = { messages: [] };


const messagesReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addMessage, (state, action) => {
            state.messages.push(action.payload);
        })
});
  
export default messagesReducer;