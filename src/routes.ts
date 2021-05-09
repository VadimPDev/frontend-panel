import Login from "./pages/Login";
import Main from "./pages/Main";
import OrderServer from './pages/OrderServer'
import Servers from "./pages/Servers";
import ControlServer from './pages/ControlServer'
import { CONTROL_SERVER, LOGIN_ROUTE, MAIN_ROUTE,MY_SERVERS,SERVER_BUY,ALL_SERVERS_ADMIN, ALL_USERS_ADMIN, CREATE_TICKET, MY_TICKETS, VIEW_TCIKET, ALL_TICKETS } from "./utils/consts";
import AllUsers from "./pages/Admin/AllUsers";
import CreateTicket from "./pages/CreateTicket";
import MyTickets from "./pages/MyTickets";
import ViewTicket from "./pages/ViewTicket";
import AllTickets from "./pages/Admin/AllTickets";
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
    },
    {
        path:VIEW_TCIKET,
        Component:ViewTicket,
        title:"Просомтр запроса",
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
    {
        path:CREATE_TICKET,
        Component:CreateTicket,
        title:'Создать запрос',
    },
    {
        path:MY_TICKETS,
        Component:MyTickets,
        title:'Мои запросы',
    }
]

export const adminRoutes:IRoutes[] = [
    {
        path:ALL_USERS_ADMIN,
        Component:AllUsers,
        title:'Все пользователи',
    },
    {
        path:ALL_TICKETS,
        Component:AllTickets,
        title:'Все запросы',
    }
]