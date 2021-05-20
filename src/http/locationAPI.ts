import {ILocation } from '../types/location'
import {$authHost} from './index'

export const locationAPI = {
    getLocations(){
        return $authHost.get<ILocation[]>('/api/location/')
    },
    createLocation(l_ip:string,l_name:string,l_password:string,l_port:number,l_cores:number,l_ram:number){
        return $authHost.post<ILocation>('/api/location/create',{
            l_ip,
            l_name,
            l_password,
            l_port,
            l_cores,
            l_ram
        }).then(res => res.data)
    },
    editLocation(location:ILocation){
        return $authHost.put<ILocation>(`/api/location/${location.id}`,location).then(res => res.data)
    },
    getAllLocations(){
        return $authHost.get<ILocation[]>('/api/location/all').then(res => res.data)
    }
}