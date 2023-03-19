import React from 'react';
import { useSelector } from 'react-redux';
import Message from "./Message";

const MessageList = ({userId}) => {
    const messageList = useSelector((state) => state.messagesReducer.messages);

    return (
        <div className="message list">
            {
                messageList.map((message, index) => 
                    <Message key={index} message={message} userId={userId}/>
                )
            }
        </div>
    )
}
export default MessageList;