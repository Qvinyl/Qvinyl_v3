import { createReducer } from '@reduxjs/toolkit';
import { setUser, setUserName, setUserCurrentRoomkey, setLoggedIn, setPeerConnection} from "../actions/userActions";

const initialState = {
    user: {},
    displayName: "",
    loggedIn: false,
    peerCon: null
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
        })

        .addCase(setPeerConnection, (state, action) => {
            console.log(action.payload.PeerConnection);
            state.peerCon = action.payload;
        });
});
  
export default userReducer;