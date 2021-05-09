
export enum UserActionTypes {
    LOGIN_USER = 'LOGIN_USER',
    LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS',
    REGISTER_USER = 'REGISTER_USER',
    REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS',
    LOGOUT_USER = 'LOGOUT_USER'
}
export interface IUser {
    id:number;
    email:string;
    role:string;
}

export interface IUserState {
    user:IUser;
    loading:boolean;
    isAuth:boolean
}

export interface IUserProfile {
    id:number;
    email:string;
    name:string;
    family:string;
    balance:number;
    role:string;
    number:string;
    createdAt:string;
}

export type UserAction = LoginUserAction | RegisterUserAction | LoginUserSuccessAction | RegisterUserSuccessAction | LogOutUserAction




interface LoginUserAction {
    type:UserActionTypes.LOGIN_USER;
}
interface LoginUserSuccessAction {
    type:UserActionTypes.LOGIN_USER_SUCCESS;
    payload:IUser
}

interface LogOutUserAction {
    type:UserActionTypes.LOGOUT_USER
}

interface RegisterUserAction {
    type:UserActionTypes.REGISTER_USER;
    payload:{
        email:string,
        password:string,
        name:string,
        family:string,
        phone:number
    }
}

interface RegisterUserSuccessAction {
    type:UserActionTypes.REGISTER_USER_SUCCESS;
    payload:{
        email:string,
        password:string
    }
}

export type RegisterUserResponse = {
    token:string
}
