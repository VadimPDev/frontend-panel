import { $authHost } from "."
import { IResponse } from "../types/global"
import {IMessage, ITicket,ITicketMessage} from '../types/ticket'

export const ticketAPI = {
    create(name:string,text:string){
        return $authHost.post<IResponse>('/api/ticket/create',{name,text}).then(res => res.data)
    },
    getMy(){
        return $authHost.get<ITicket[]>('/api/ticket/getMy').then(res => res.data)
    },
    getAll(){
        return $authHost.get<ITicket[]>('/api/ticket/getAll').then(res => res.data)
    },
    getMessages(id:string){
        return $authHost.get<ITicketMessage[]>(`/api/ticket/messages/${id}`).then(res => res.data)
    }
}