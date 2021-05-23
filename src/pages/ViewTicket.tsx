import { Avatar, Button, Card, CardContent, Grid, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import io from 'socket.io-client'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { IUser } from '../types/user'
import {IMessage, ITicketMessage} from '../types/ticket'
import SendIcon from '@material-ui/icons/Send';
import Messages from '../components/Messages/Messages'
import { ticketAPI } from '../http/ticketAPI'

let socket:any
const ViewTicket:React.FC = () => {

    const {id} = useParams<Record<string,string>>()


    const [messages,setMessages] = useState<ITicketMessage[]>([])
    const [message,setMessage] = useState<string>('')

    const {user} = useTypedSelector(state => state.user)

    useEffect(()=>{
        async function fetchTicketsMessages(){
            const ticketsMessages = await ticketAPI.getMessages(id)
            setMessages(ticketsMessages)
        }
        fetchTicketsMessages()
    },[])

    useEffect(()=>{
        socket = io(process.env.REACT_APP_API_URL!,{ query:{id}, transports: ["websocket","polling"] })
        socket.emit('join',{id})

        return () =>{
            socket.emit('exit',{id})
            socket.off()
        }
    },[id])

    useEffect(()=>{
        socket.on('message',(message:ITicketMessage)=>{
            setMessages(prevValue => [...prevValue,message])
        })
    },[])


    const sendMessage = (event:React.KeyboardEvent<HTMLDivElement>) =>{
        event.preventDefault()
        socket.emit('sendMessage',{t_message:message,id,userId:user.id})
        setMessage('')
    }


    return (
        <Grid container justify={'center'}>
             <Card style={{width:1000,marginTop:20}}>
                <CardContent>
                    <Typography variant={'h5'}>Просмотр запроса</Typography>                    
                    <Messages messages={messages} />
                    <div className="ticket_actions">
                        <TextField
                        value={message}
                        placeholder='Введи сообщение'
                        onChange={event => setMessage(event.target.value)}
                        onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                        fullWidth
                        />
                        <Button variant={'outlined'}><SendIcon /></Button>
                    </div>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default ViewTicket;