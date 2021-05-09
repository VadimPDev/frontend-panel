import {IUserProfile, UserAction, UserActionTypes } from './../../types/user';
import {userAPI} from '../../http/userAPI'
import {usersAdminAPI} from '../../http/admin/usersAdminAPI'
import { GlobalAction, GlobalActionTypes } from '../../types/global';
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../reducers'
import { Dispatch } from 'react';

type userType = ThunkAction<Promise<void>, RootState, unknown, UserAction | GlobalAction>

export const loginUser = (email:string,password:string):userType =>{
    return  async(dispatch) =>{
        try{
            dispatch({type:UserActionTypes.LOGIN_USER})
            const response = await userAPI.login(email, password)
            dispatch(setUser(response.email,response.role,response.id))
        }catch(e){
            dispatch({type:GlobalActionTypes.SET_ERROR,payload:e.response.data.message})
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


export const editAdminUser = (id:number,email:string,name:string,family:string,balance:number,number:string) => {
    return async(dispatch:Dispatch<GlobalAction>) =>{
        try{
            const response = await usersAdminAPI.edit(id, email,name,family,balance,number)
            dispatch({type:GlobalActionTypes.SET_MESSAGE,payload:response.data.message})
        }catch(e){
            dispatch({type:GlobalActionTypes.SET_ERROR,payload:e.response.data.message})
        }
    }
}