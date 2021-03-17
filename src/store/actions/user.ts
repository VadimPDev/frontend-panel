import { IUser, UserAction, UserActionTypes } from './../../types/user';
import {login} from '../../http/userAPI'
import {Dispatch} from 'redux'


export const loginUser = (email:string,password:string) =>{
    return  async(dispatch:Dispatch<UserAction>) =>{
        try{
            dispatch({type:UserActionTypes.LOGIN_USER})
            const response = await login(email,password)
            dispatch(setUser(response.email,response.role,response.id))
        }catch(e){

        }
    }
}

export const setUser = (email:string,role:string,id:number):UserAction =>{
    return {
        type:UserActionTypes.LOGIN_USER_SUCCESS,
        payload:{email,role,id}
    }
}

export const logOutUser = () =>{
    return {type:UserActionTypes.LOGOUT_USER}
}