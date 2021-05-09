import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import {useTypedSelector} from '../hooks/useTypedSelector'
import {adminRoutes, privateRoutes,publicRoutes,sidebarRoutes} from '../routes'
import { LOGIN_ROUTE, MAIN_ROUTE } from '../utils/consts'


const AppRouter:React.FC = () => {
    const {isAuth} = useTypedSelector(state => state.user)

    return isAuth ? (
        <>
        <Switch>
            {sidebarRoutes.map(({path,Component}) =>
                <Route key={path} path={path}  component={Component} exact={true} />
            )}
             {privateRoutes.map(({path,Component}) =>
                <Route key={path} path={path}  component={Component} exact={true} />
            )}
            {adminRoutes.map(({path,Component}) =>
                <Route key={path} path={path}  component={Component} exact={true} />
            )}
            <Redirect to={MAIN_ROUTE} />
        </Switch>
        </>
    )
    : (
        <Switch>
            {publicRoutes.map(({path,Component}) =>
               <Route key={path} path={path}  component={Component} exact={true} />
            )}
            <Redirect to={LOGIN_ROUTE} />
        </Switch>
    )
}

export default AppRouter;