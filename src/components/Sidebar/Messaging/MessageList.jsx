import React from 'react';
import Message from "./Message";

const MessageList = ({messageList, userId}) => {

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