import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Message from "./Message";

const MessageList = ({userId}) => {
    const messagesEndRef = useRef(null)
    const messageList = useSelector((state) => state.messagesReducer.messages);

    useEffect(() => {
        scrollToBottom();
    }, [messageList]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView()
    }

    return (
        <div className="message">
            <div className="list">
            {
                messageList.map((message, index) => 
                    <Message key={index} message={message} userId={userId}/>
                )
            }
            <div ref={messagesEndRef} />
            </div>
        </div>
    )
}
export default MessageList;