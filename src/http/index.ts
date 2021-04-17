import axios,{AxiosRequestConfig} from 'axios'
import { logOutUser } from '../store/actions/user'
import {store} from '../store/index'
import { GlobalActionTypes } from '../types/global'
import { UserActionTypes } from '../types/user'


export const $authHost = axios.create({
    baseURL:process.env.REACT_APP_API_URL
})

export const $host  = axios.create({
    baseURL:process.env.REACT_APP_API_URL
})


const authInerceptor = (config:AxiosRequestConfig) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response && error.response.data) {
        if(error.response.status === 401){
            // сделать систему refresh токенов
            store.dispatch({type:UserActionTypes.LOGOUT_USER})
        }
        if(error.response.status === 403){
            // не работает
        }
    }
    return Promise.reject(error.message);
});

$authHost.interceptors.request.use(authInerceptor)