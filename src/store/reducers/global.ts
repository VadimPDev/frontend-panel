import { GlobalAction, GlobalActionTypes, IGlobal } from '../../types/global';


const initialState:IGlobal = {
    loading:false,
    error:null,
    message:null,
}


export const globalReducer = (state = initialState,action:GlobalAction):IGlobal =>{
    switch(action.type){
        case GlobalActionTypes.LOADING_START:
            return {...state,loading:true}
        case GlobalActionTypes.LOADING_STOP:
            return {...state,loading:false}
        case GlobalActionTypes.SET_ERROR:
            return {...state, error: action.payload}
        case GlobalActionTypes.SET_MESSAGE:
            return {...state, message: action.payload}
        case GlobalActionTypes.RESET:
            return initialState
        default:
            return state
    }
}