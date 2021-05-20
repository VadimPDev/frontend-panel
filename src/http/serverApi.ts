import {ILocation} from '../types/location'
import {IGame} from '../types/game'
import {IVersion} from '../types/version'
import {$authHost} from './index'
import {IInfoServer, IServer} from '../types/server'
import { IResponse } from '../types/global'



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
    },
    sendRcon(id:number,command:string){
        return $authHost.post<IResponse>('/api/server/rcon',{
            id,command
        }).then(res => res.data)
    }
}