import { orderActiionTypes, orderAction } from './../../types/orderServer';
import { Dispatch } from 'redux'
import {serverAPI} from '../../http/serverApi'


export const fetchGames = () =>{
    return async(dispatch:Dispatch<orderAction>) =>{
        try{
            dispatch({type:orderActiionTypes.FETCH_GAMES_START})
            const response = await serverAPI.getGames()
            dispatch({type:orderActiionTypes.FETCH_GAMES_SUCCESS,payload:response.data})
        }catch(e){
            dispatch({type:orderActiionTypes.FETCH_GAMES_ERROR})
        }
    }
}

export const fetchLocations = () =>{
    return async(dispatch:Dispatch<orderAction>) =>{
        try{
            dispatch({type:orderActiionTypes.FETCH_LOCATIONS_START})
            const response = await serverAPI.getLocations()
            dispatch({type:orderActiionTypes.FETCH_LOCATIONS_SUCCESS,payload:response.data})
        }catch(e){
            dispatch({type:orderActiionTypes.FETCH_LOCATIONS_ERROR})
        }
    }
}

export const fetchVersion = (gameId:number) =>{
    return async(dispatch:Dispatch<orderAction>) =>{
        try{
            dispatch({type:orderActiionTypes.FETCH_VERSIONS_START})
            const response = await serverAPI.getVersions(gameId)
            dispatch({type:orderActiionTypes.FETCH_VERSIONS_SUCCESS,payload:response.data})
        }catch(e){
            dispatch({type:orderActiionTypes.FETCH_VERSIONS_ERROR})
        }
    }
}

export const resetOrdersPage =() =>{
    return {
        type:orderActiionTypes.RESET_ORDERS_SERVERS
    }
}