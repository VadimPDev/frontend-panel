import { IServer, ServerAction, ServerActionTypes } from "../../types/server"

const initialState:IServer = {
    id:0,
    s_slots:0,
    s_port:0,
    s_status:0,
    s_password:'',
    location:{
        l_ip:'',
        l_name:'',
    },
    game:{
        g_name:'',
        g_code:''
    },
    version:{
        v_name:''
    },

}
export const serverReducer = (state = initialState,action:ServerAction):IServer =>{
    switch(action.type){
        case ServerActionTypes.SERVER_START:
            return {...state,s_status:1}
        case ServerActionTypes.SERVER_STOP:
            return {...state,s_status:0}
        case ServerActionTypes.GET_MY_SERVER:
            return {...state, ...action.payload}
        default:
            return state
    }
}