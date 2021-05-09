export enum ServerActionTypes  {
    SERVER_START = 'SERVER_START',
    SERVER_STOP = 'SERVER_STOP',
    GET_MY_SERVER = 'GET_MY_SERVER',
    RESET_ORDERS_SERVERS = 'RESET_ORDERS_SERVERS',
    GET_SERVER_CONFIG = 'GET_SERVER_CONFIG',
}



export enum ServerStatus {
    'Выключен' = 0,
    'Работает' = 1,
    'Заблокирован' = 2,
    'Просрочен' = 3
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
        g_code:string;
    };
    version:{
        v_name:string
    };
}

export  interface IInfoServer {
    name:string;
    map:string;
    players:[];
    maxplayers:number;
    raw:{
        numplayers:number;
        gamemode:string;
    };
    ping:number
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