import Login from "./pages/Login";
import Main from "./pages/Main";
import OrderServer from './pages/OrderServer'
import Servers from "./pages/Servers";
import ControlServer from './pages/ControlServer'
import { CONTROL_SERVER, LOGIN_ROUTE, MAIN_ROUTE,MY_SERVERS,SERVER_BUY } from "./utils/consts";
interface IRoutes {
    path:string;
    Component:React.FC,
    title:string,
}

export const publicRoutes:IRoutes[] = [
    {
        path:LOGIN_ROUTE,
        Component:Login,
        title:'Авторизация',
    }
]



export const privateRoutes:IRoutes[] = [
    {
        path:CONTROL_SERVER,
        Component:ControlServer,
        title:"Управление сервером",
    }
]

export const sidebarRoutes:IRoutes[] = [
    {
        path:MAIN_ROUTE,
        Component:Main,
        title:'Главная',
    },
    {
        path:SERVER_BUY,
        Component:OrderServer,
        title:'Заказать сервер',
    },
    {
        path:MY_SERVERS,
        Component:Servers,
        title:'Мои сервера',
    },
]