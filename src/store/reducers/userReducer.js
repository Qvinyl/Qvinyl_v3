import { createReducer } from '@reduxjs/toolkit';
import { setUser, setUserCurrentRoomkey, setLoggedIn } from "../actions/userActions";

const initialState = {
    user: {},
    loggedIn: false
 };


const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setUser, (state, action) => {
            state.user = action.payload
        })
        .addCase(setUserCurrentRoomkey, (state, action) => {
            state.user.current_room_id = action.payload
        })
        .addCase(setLoggedIn, (state, action) => { 
            state.loggedIn = action.payload;
        });
});
  
export default userReducer;