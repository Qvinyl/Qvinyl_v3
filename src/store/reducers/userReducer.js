import { createReducer } from '@reduxjs/toolkit';
import { setUser, setUserCurrentRoomkey } from "../actions/userActions";

const initialState = { user: {} };


const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setUser, (state, action) => {
            state.user = action.payload
        })
        .addCase(setUserCurrentRoomkey, (state, action) => {
            state.user.current_room_id = action.payload
        });
});
  
export default userReducer;