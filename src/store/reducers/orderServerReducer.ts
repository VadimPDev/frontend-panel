import { IOrderServer, orderActiionTypes, orderAction } from "../../types/orderServer"



const initialState:IOrderServer = {
    versions:[],
    locations:[],
    games:[],
    loading:false
}





export const orderServerReducer = (state = initialState,action:orderAction):IOrderServer =>{
    switch(action.type){
        case orderActiionTypes.FETCH_GAMES_START:
            return {...state,loading:true}
        case orderActiionTypes.FETCH_GAMES_SUCCESS:
            return {...state,games:action.payload, loading:false}
        case orderActiionTypes.FETCH_GAMES_ERROR:
            return {...state,loading:false}
        case orderActiionTypes.FETCH_LOCATIONS_START:
            return {...state,loading:true}
        case orderActiionTypes.FETCH_LOCATIONS_SUCCESS:
            return {...state,locations:action.payload, loading:false}
        case orderActiionTypes.FETCH_LOCATIONS_ERROR:
            return {...state,loading:false}
        case orderActiionTypes.FETCH_VERSIONS_START:
            return {...state,loading:true}
        case orderActiionTypes.FETCH_VERSIONS_SUCCESS:
            return {...state,versions:action.payload, loading:false}
        case orderActiionTypes.FETCH_VERSIONS_ERROR:
            return {...state,loading:false}
        case orderActiionTypes.RESET_ORDERS_SERVERS:
            return initialState
        default:
            return state
    }
}