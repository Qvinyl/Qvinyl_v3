import React from 'react';
import Message from "./Message";

const MessageList = () => {
    const messageList = [
        { 
            text: "Hello World!",
            user: {
                name: "Joshua Cheung",
                id: 12837049871
            },
            received: false
        },
        { 
            text: "Did you queue up the video yet?",
            user: {
                name: "Joshua Cheung",
                id: 12837049871
            },
            received: false
        },
        { 
            text: "Earlier Django was considered to be the right choice when there was a requirement for full-fledged enterprise-scale web applications. But, today Flask is equally mature and can serve well for the same conditions.",
            user: {
                name: "Nicholas Cheung",
                id: 12374012
            },
            received: true
        },
        { 
            text: "However, developers tend to choose Flask more for developing small or static websites, or while implementing quick to deliver RESTful API web services.",
            user: {
                name: "Joshua Cheung",
                id: 12837049871
            },
            received: false
        },
        { 
            text: "Having skilled resources in the convention of the framework that you use pays off. You can expect faster development, faster testing, speedier delivery, and quicker issue fixes.",
            user: {
                name: "Nicholas Cheung",
                id: 12374012
            },
            received: true
        }
    ]

    return (
        <div className="list" style={{height: "100%"}}>
            {
                messageList.map((message) => 
                    <Message message={message}/>
                )
            }
        </div>
    )
}
export default MessageList;