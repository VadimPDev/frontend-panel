import { IGame, ILocation, IVersion } from '../types/orderServer'
import {$authHost} from './index'
import {IInfoServer, IServer} from '../types/server'
import { IResponse } from '../types/global'


/*export const getGames = async() =>{
    const {data} = await $authHost.get('/api/game/')
    return data
}

export const orderServer = async(game_id:number,location_id:number,slots:number | number[],period:number,version:number) =>{
    const {data}  = await $authHost.post('/api/server/order',{
        game_id,
        location_id,
        slots,
        period,
        version_id:version
    })
    return data
}

export const startServer = async(serverId:number) =>{
    const {data} = await $authHost.post('/api/server/start',{
        serverId
    })
    return data
}

export const stopServer = async(serverId:number) =>{
    const {data} = await $authHost.post('/api/server/stop',{
        serverId
    })
    return data
}

export const getLocations = async() =>{
    const {data} = await $authHost.get('/api/location/')
    return data
}

export const getVersions = async(gameId:number):Promise<IVersion[]> =>{
    const {data} = await $authHost.get('/api/version/',{
        params:{gameId}
    })
    return data
}

export const getMyServers = async():Promise<IServer[]> =>{
    const {data} = await $authHost.get('/api/server/all')
    return data
}

export const getMyServerById = async(id:string) =>{
    const {data} = await $authHost.get('/api/server/my',{
        params:{
            id
        }
    })
    return data
}

export const getServerInfo = async(id:string):Promise<IInfoServer> =>{
    const {data} = await $authHost.get('/api/server/info',{
        params:{
            id
        }
    })
    return data
}
*/

export const serverAPI = {
    getGames(){
        return $authHost.get<IGame[]>('/api/game/')
    },
    orderServer(game_id:number,location_id:number,slots:number | number[],period:number,version:number){
        return $authHost.post<IResponse>('/api/server/order',{
            game_id,
            location_id,
            slots,
            period,
            version_id:version
        })
    },
    startServer(serverId:number){
        return $authHost.post<IResponse>('/api/server/start',{
            serverId
        })
    },
    stopServer(serverId:number){
        return $authHost.post<IResponse>('/api/server/stop',{
            serverId
        })
    },
    getLocations(){
        return $authHost.get<ILocation[]>('/api/location/')
    },
    getVersions(gameId:number){
        return $authHost.get<IVersion[]>('/api/version/',{
            params:{gameId}
        })
    },
    getMyServers(){
        return $authHost.get<IServer[]>('/api/server/all')
    },
    getMyServerById(id:string){
        return $authHost.get('/api/server/my',{
            params:{
                id
            }
        })
    },
    getServerInfo(id:string){
        return $authHost.get<IInfoServer>('/api/server/info',{
            params:{
                id
            }
        })
    },
    getConfig(id:number){
        return $authHost.get('/api/server/config',{
            params:{id}
        })
    },
    putConfig(id:number, config:string){
        return $authHost.post('/api/server/config',{id,config})
    },
    getConsole(id:number){
        return $authHost.get('/api/server/console',{
            params:{id}
        })
    }
}