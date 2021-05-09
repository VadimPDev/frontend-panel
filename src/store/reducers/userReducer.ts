import { UserAction } from './../../types/user';
import { IUserState, UserActionTypes, IUser } from "../../types/user"


const initialState:IUserState = {
    user:{} as IUser,
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
            return initialState
        default:
            return state
    }
}