import React, { useRef,useEffect } from 'react'
import { IMessage,ITicketMessage } from '../../types/ticket';
import Message from '../Message/Message';
interface IMessagesProps {
    messages:ITicketMessage[]
}
const Messages:React.FC<IMessagesProps> = ({messages}) => {
    const scroll = useRef<HTMLDivElement>(null)
    useEffect(()=>{
        if(scroll && scroll.current){
            scroll.current.scrollTop = scroll.current.scrollHeight
        }
    })
    return (
        <div ref={scroll} className="container-messages">
            {messages.map((message,index) => <Message key={index} text={message.t_message} sender={message.userId} />)}
        </div>
    );
}

export default Messages;