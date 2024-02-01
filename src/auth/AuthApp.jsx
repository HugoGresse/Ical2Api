import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Login from './Login'
import Logout from './Logout'

// Store is not within this app, only the routing/ui
const AuthApp = () => {
    const { path } = useRouteMatch()

    return (
        <Switch>
            <Route path={`${path}login`}>
                <Login />
            </Route>
            <Route path={`${path}logout`}>
                <Logout />
            </Route>
            <Route parth="*">
                <div>404</div>
            </Route>
        </Switch>
    )
}

export default AuthApp
