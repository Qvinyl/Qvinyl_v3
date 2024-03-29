import {createAction} from '@reduxjs/toolkit';

export const addMessage = createAction('messageList/addMessage');
export const clearMessages = createAction('messageList/clearMessages');
export const hasUnreadMessages = createAction('messageList/hasUnreadMessages');