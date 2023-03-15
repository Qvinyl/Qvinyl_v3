// export const ADD_MESSAGE = 'ADD_MESSAGE';

// export const addMessage = (payload) => {
//     return {
//         type: ADD_MESSAGE,
//         payload
//     }
// }


import {createAction} from '@reduxjs/toolkit';

export const addMessage = createAction('messageList/addMessage');
export const clearMessages = createAction('messageList/clearMessages');