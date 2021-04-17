import { UserAction } from './../../types/user';
import { IUserState, UserActionTypes } from "../../types/user"


const initialState:IUserState = {
    user:{},
    loading:false,
    isAuth:false
}


export const userReducer = (state = initialState,action:UserAction):IUserState =>{
    switch(action.type){
        case UserActionTypes.LOGIN_USER:
            return {...state,loading:true}
        case UserActionTypes.LOGIN_USER_SUCCESS:
            return {user:action.payload,loading:false,isAuth:true}
        case UserActionTypes.REGISTER_USER:
            return {...state,loading:true}
        case UserActionTypes.REGISTER_USER_SUCCESS:
            return {...state,loading:false}
        case UserActionTypes.LOGOUT_USER:
            return {...state,user:{},isAuth:false}
        default:
            return state
    }
}