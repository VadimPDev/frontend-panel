import { GlobalActionTypes } from "../../types/global";


export function startLoading(){
    return {
        type:GlobalActionTypes.LOADING_START
    }
}

export function stopLoading(){
    return {
        type:GlobalActionTypes.LOADING_STOP,
    }
}


export function setMessage(message:string){
    return {
        type:GlobalActionTypes.SET_MESSAGE,
        payload:message
    }
}

export function setError(message:string){
    return {
        type:GlobalActionTypes.SET_ERROR,
        payload:message
    }
}

export function ResetGlobal(){
    return {
        type:GlobalActionTypes.RESET
    }
}