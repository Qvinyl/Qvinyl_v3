import { createReducer } from '@reduxjs/toolkit';
import { setPlaylist, setLastPlayed } from "../actions/queueActions";

const initialState = { 
    queue: [],
    lastPlayed: []
};


const queueReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setPlaylist, (state, action) => {
            state.queue = action.payload;
        })
        .addCase(setLastPlayed, (state, action) => {
            state.lastPlayed = action.payload;
        })
});
  
export default queueReducer;