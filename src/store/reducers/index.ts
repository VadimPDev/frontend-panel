import { userReducer } from './userReducer';
import {orderServerReducer} from './orderServerReducer'
import { combineReducers } from "redux";
import { serverReducer } from './serverReducer';


export const rootReducer = combineReducers({
    user:userReducer,
    order:orderServerReducer,
    server:serverReducer
})


export type RootState = ReturnType<typeof rootReducer>