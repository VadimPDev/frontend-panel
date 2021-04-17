import { userReducer } from './userReducer';
import {orderServerReducer} from './orderServerReducer'
import { combineReducers } from "redux";
import { serverReducer } from './serverReducer';
import { globalReducer } from './global';


export const rootReducer = combineReducers({
    user:userReducer,
    order:orderServerReducer,
    server:serverReducer,
    global:globalReducer
})


export type RootState = ReturnType<typeof rootReducer>