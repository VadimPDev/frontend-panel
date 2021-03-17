import { IVersion } from '../types/orderServer'
import {$authHost} from './index'
import {IInfoServer} from '../types/server'


export const getGames = async() =>{
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

export const getMyServers = async() =>{
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