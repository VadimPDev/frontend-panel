import React from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Avatar } from '@material-ui/core'
import { IUser } from '../../types/user';
interface IMessageProps {
    text:string;
    sender:number;
}
const Message:React.FC<IMessageProps> = ({text,sender}) => {
    let isSendByCurrentUser = false

    const {user} = useTypedSelector(state => state.user)

    if(user.id !== sender){
        isSendByCurrentUser = true
    }
    return (
        isSendByCurrentUser ? (
            <div className="message">
                <Avatar>V</Avatar>
                <div className="message__text">{text}</div>
            </div>
        )
        : (
            <div className="message" style={{alignSelf:'flex-end'}}>
                <div className="message__text my_message">{text}</div>
            </div>
        )
    );
}

export default Message;