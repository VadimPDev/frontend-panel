export enum ServerActionTypes  {
    SERVER_START = 'SERVER_START',
    SERVER_STOP = 'SERVER_STOP',
    GET_MY_SERVER = 'GET_MY_SERVER'
}

export interface IServer {
    id:number;
    s_slots:number;
    s_port:number;
    s_status:number;
    s_password:string;
    location:{
        l_ip:string;
        l_name:string;
    };
    game:{
        g_name:string;
    },
    version:{
        v_name:string
    }
}

export  interface IInfoServer {
    hostname:string;
    online:number;
    players:[];
    maxplayers:number;
}


export type ServerAction =  IServerStartAction | IServerStopAction | IServerFetchAction



interface IServerStartAction {
    type:ServerActionTypes.SERVER_START;
}


interface IServerStopAction {
    type:ServerActionTypes.SERVER_STOP;
}

interface IServerFetchAction {
    type:ServerActionTypes.GET_MY_SERVER;
    payload:IServer
}