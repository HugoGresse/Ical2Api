import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import { StateProvider } from './state/state'
import OrganizationApp from './organisations/OrganizationApp'
import Home from './home/Home'
import AuthApp from './auth/AuthApp'
import AuthListener from './auth/AuthListener'
import { initialState, reducer } from './state/reducer'

const App = () => {
    return (
        <BrowserRouter>
            <StateProvider initialState={initialState} reducer={reducer}>
                <AppLayout>
                    <AuthListener>
                        <Switch>
                            <Route path="/o/">
                                <OrganizationApp />
                            </Route>
                            <Route path="/a/">
                                <AuthApp />
                            </Route>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route parth="*">
                                <div>404</div>
                            </Route>
                        </Switch>
                    </AuthListener>
                </AppLayout>
            </StateProvider>
        </BrowserRouter>
    )
}

export default App
