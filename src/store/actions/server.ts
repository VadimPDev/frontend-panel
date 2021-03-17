import {startServer,stopServer,getMyServerById} from '../../http/serverApi'
import {Dispatch} from 'redux'
import { ServerAction,ServerActionTypes } from '../../types/server'


export const StartServer = (id:number) =>{
    return  async(dispatch:Dispatch<ServerAction>) =>{
        try{
            dispatch({type:ServerActionTypes.SERVER_START})
            await startServer(id)
        }catch(e){

        }
    }
}

export const StopServer = (id:number) =>{
    return  async(dispatch:Dispatch<ServerAction>) =>{
        try{
            dispatch({type:ServerActionTypes.SERVER_STOP})
            await stopServer(id)
        }catch(e){

        }
    }
}

export const getMyserver = (id:string) =>{
    return  async(dispatch:Dispatch<ServerAction>) =>{
        try{
            const server = await getMyServerById(id)
            dispatch({type:ServerActionTypes.GET_MY_SERVER,payload:server})
        }catch(e){

        }
    }
}