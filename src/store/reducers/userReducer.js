import { createReducer } from '@reduxjs/toolkit';
import { setUser, setUserName, setUserCurrentRoomkey, setLoggedIn } from "../actions/userActions";

const initialState = {
    user: {},
    displayName: "",
    loggedIn: false
 };


const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setUser, (state, action) => {
            state.user = action.payload
            if (state.user.current_room_id === null) {
                state.user.current_room_id = "";
            }
        })

        .addCase(setUserName, (state, action) => {
            state.displayName = action.payload
        })

        .addCase(setUserCurrentRoomkey, (state, action) => {
            state.user.current_room_id = action.payload
        })

        .addCase(setLoggedIn, (state, action) => { 
            state.loggedIn = action.payload;
        });
});
  
export default userReducer;