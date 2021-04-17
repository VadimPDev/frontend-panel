import jwt_decode from 'jwt-decode'
import { IUser,RegisterUserResponse } from '../types/user'
import {$authHost,$host} from './index'


export const login = async(email:string,password:string):Promise<IUser> =>{
        const {data} = await $host.post('/api/user/login',{email,password})
        localStorage.setItem('token',data.token)
        return jwt_decode(data.token)
}


export const check = async():Promise<IUser> =>{
        const {data} = await $authHost.get('/api/user/check')
        localStorage.setItem('token',data.token)
        return jwt_decode(data.token)
}



export const userAPI = {
        login(email:string,password:string){
                return $host.post('/api/user/login',{email,password}).then(res => {
                        localStorage.setItem('token',res.data.token)
                        return jwt_decode(res.data.token)
                })
        },
        registration(email:string, name:string, family:string, password:string, number:string){
                return $host.post<RegisterUserResponse>('/api/user/registration',{email, password, name, family, number}).then(res => res.data)
        },
        check(){
                return $authHost.get('/api/user/check').then(res => {
                        localStorage.setItem('token',res.data.token)
                        return jwt_decode(res.data.token)
                })
        }
}