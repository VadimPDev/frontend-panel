import {IGame} from './game'
import {ILocation} from './location'
import {IVersion} from './version'

export enum orderActiionTypes {
    FETCH_GAMES_START = 'FETCH_GAMES_START',
    FETCH_GAMES_SUCCESS = 'FETCH_GAMES_SUCCESS',
    FETCH_GAMES_ERROR = 'FETCH_GAMES_ERROR',
    FETCH_LOCATIONS_START = 'FETCH_LOCATIONS_START',
    FETCH_LOCATIONS_SUCCESS = 'FETCH_LOCATIONS_SUCCESS',
    FETCH_LOCATIONS_ERROR = 'FETCH_LOCACTIONS_ERROR',
    FETCH_VERSIONS_SUCCESS = 'FETCH_VERSIONS_SUCCESS',
    FETCH_VERSIONS_START = 'FETCH_VERSIONS_START',
    FETCH_VERSIONS_ERROR = 'FETCH_VERSIONS_ERROR',
    RESET_ORDERS_SERVERS = 'RESET_ORDERS_SERVERS'
}

export interface IOrderServer {
    versions:IVersion[];
    locations:ILocation[];
    games:IGame[];
    loading:boolean;
}

export type orderAction = fetchGamesSuccess 
                            | fetchGamesStart 
                            | fetchGamesError 
                            | fetchLocationsStart 
                            | fetchLocationsSuccess 
                            | fetchLocationsError 
                            | fetchVersionsStart 
                            | fetchVersionsSuccess 
                            | fetchVersionsError
                            | IServerResetOrderAction

interface fetchGamesStart {
    type:orderActiionTypes.FETCH_GAMES_START
}
interface fetchGamesSuccess {
    type:orderActiionTypes.FETCH_GAMES_SUCCESS,
    payload:IGame[]
}
interface fetchGamesError {
    type:orderActiionTypes.FETCH_GAMES_ERROR
}

interface fetchLocationsStart {
    type:orderActiionTypes.FETCH_LOCATIONS_START
}
interface fetchLocationsSuccess {
    type:orderActiionTypes.FETCH_LOCATIONS_SUCCESS,
    payload:ILocation[]
}

interface fetchLocationsError {
    type:orderActiionTypes.FETCH_LOCATIONS_ERROR
}

interface fetchVersionsStart {
    type:orderActiionTypes.FETCH_VERSIONS_START
}
interface fetchVersionsSuccess {
    type:orderActiionTypes.FETCH_VERSIONS_SUCCESS,
    payload:IVersion[]
}

interface fetchVersionsError {
    type:orderActiionTypes.FETCH_VERSIONS_ERROR
}

interface IServerResetOrderAction {
    type:orderActiionTypes.RESET_ORDERS_SERVERS;
}