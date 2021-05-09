import { $authHost } from ".."
import {IUserProfile } from "../../types/user"

export const usersAdminAPI = {
    getAllUsers(){
        return $authHost.get<IUserProfile[]>('/api/admin/users').then(res => res.data)
    },
    edit(id:number,email:string, name:string, family:string, balance:number, number:string){
        return $authHost.post('/api/admin/users/edit',{
            id,
            email,
            name,
            family,
            balance,
            number
        })
    }
}