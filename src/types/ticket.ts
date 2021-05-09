import {IUser} from '../types/user'
export interface ITicket {
    id:number;
    t_name:string;
    createdAt:string;
}

export interface ITicketMessage {
    id:number;
    t_message:string;
    userId:number;
    ticketId:number;
}

export interface IMessage {
    text:string;
    user:IUser;
}