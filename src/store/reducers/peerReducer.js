import { createReducer } from '@reduxjs/toolkit';
// import PeerService from '../../../features/callingService/PeerService';
import { connect, connectDataWithAll } from '../actions/PeerActions'; 

const initialState = {
    peers: [],
    peerId: null,
    nickname: '',
    connected: false,
    wait: false
};


const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(connect, (state, action) => {
            const { wait, connected, peerId, nickname, peers } = action.payload;
            state.wait = wait;
            state.connected = connected;
            state.peerId = peerId;
            state.nickname = nickname;
            state.peers = peers || [];
        });
});
  
  
export default userReducer;