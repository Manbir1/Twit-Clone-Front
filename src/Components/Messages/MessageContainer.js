import React, { useState } from 'react'
import Message from './Message'

export default function MessageContainer({ messageArr }) {
    return (
        <div style={{display: "flex", flexDirection: "column", width:"100%"}}>
        {
            messageArr.map(message => <Message sender ={true} content={message.content}/>)
        }
        </div>
    )
}
