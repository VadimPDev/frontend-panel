import {serverAPI} from '../../http/serverApi'
import {Dispatch} from 'redux'
import { ServerAction,ServerActionTypes } from '../../types/server'
import { GlobalAction, GlobalActionTypes} from '../../types/global'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../reducers'


export const StartServer = (id:number) =>{
    return  async(dispatch:Dispatch<ServerAction>) =>{
        try{
            dispatch({type:ServerActionTypes.SERVER_START})
            await serverAPI.startServer(id)
        }catch(e){

        }
    }
}

type serverType = ThunkAction<Promise<void>, RootState, unknown, ServerAction | GlobalAction>

export const StopServer = (id:number) =>{
    return  async(dispatch:Dispatch<ServerAction>) =>{
        try{
            dispatch({type:ServerActionTypes.SERVER_STOP})
            await serverAPI.stopServer(id)
        }catch(e){

        }
    }
}

export const changeRcon = (rcon:string) =>{
    return {
        type:ServerActionTypes.SERVER_CHANGE_RCON,
        payload:rcon
    }
}

export const getMyserver = (id:string):serverType =>{
    return  async(dispatch) =>{
        dispatch({type:GlobalActionTypes.LOADING_START})
        try{
            const server = await serverAPI.getMyServerById(id)
            dispatch({type:ServerActionTypes.GET_MY_SERVER,payload:server.data})
            dispatch({type:GlobalActionTypes.LOADING_STOP})
        }catch(e){
            console.log(e)
            dispatch({type:GlobalActionTypes.LOADING_STOP})
        }
    }
}

