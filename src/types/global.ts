export enum GlobalActionTypes {
    LOADING_START = 'LOADING_START',
    LOADING_STOP = 'LOADING_STOP',
    SET_ERROR = 'SET_ERROR',
    SET_MESSAGE = 'SET_MESSAGE',
    RESET = 'RESET'
}

export interface IGlobal {
    error: string | null;
    loading: boolean;
    message:string | null
}

export interface IResponse {
    message:string
}

export type GlobalAction = LoadingStartAction | LoadingStopAction | SetErrorAction | SetMessageAction | ResetGlobalStateAction


interface LoadingStartAction {
    type:GlobalActionTypes.LOADING_START
}

interface LoadingStopAction {
    type:GlobalActionTypes.LOADING_STOP
}

interface SetErrorAction {
    type:GlobalActionTypes.SET_ERROR;
    payload:string;
}

interface SetMessageAction {
    type:GlobalActionTypes.SET_MESSAGE;
    payload:string;
}

interface ResetGlobalStateAction {
    type:GlobalActionTypes.RESET
}
