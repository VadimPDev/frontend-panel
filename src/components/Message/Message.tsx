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
            <div className="message__row">
                <Avatar>V</Avatar>
                <div>
                    <div className="message__text">
                        <div className='message__name'>Test</div>
                        {text}
                    </div>
                </div>
            </div>
        )
        : (
            <div className="message__row" style={{alignSelf:'flex-end'}}>
                <div>
                    <div className="message__text my_message">{text}</div>
                </div>
            </div>
        )
    );
}

export default Message;