import { $authHost } from "."
import { IVersion } from "../types/version"


export const versionAPI = {
    getAllVersions(){
        return $authHost.get<IVersion[]>('/api/version/all').then(res => res.data)
    },
    editVersion(version:IVersion){
        return $authHost.post(`/api/version/${version.id}`,version).then(res => res.data)
    },
    createVersion(version:IVersion){
        return $authHost.post('/api/version',version).then(res => res.data)
    }

}