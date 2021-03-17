import jwt_decode from 'jwt-decode'
import { IUser } from '../types/user'
import {$authHost,$host} from './index'


export const login = async(email:string,password:string):Promise<IUser> =>{
        const {data} = await $host.post('/api/user/login',{email,password})
        localStorage.setItem('token',data.token)
        return jwt_decode(data.token)
}


export const registration = async() =>{

}

export const check = async():Promise<IUser> =>{
        const {data} = await $authHost.get('/api/user/check')
        localStorage.setItem('token',data.token)
        return jwt_decode(data.token)
}