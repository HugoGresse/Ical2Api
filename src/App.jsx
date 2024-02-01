import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import { StateProvider } from './state/state'
import OrganizationsApp from './organisations/OrganizationsApp'
import Home from './pages/Home'
import AuthApp from './auth/AuthApp'
import AuthListener from './auth/AuthListener'
import { initialState, reducer } from './state/reducer'
import SlackResult from './pages/SlackResult'

const App = () => {
    return (
        <BrowserRouter>
            <StateProvider initialState={initialState} reducer={reducer}>
                <AppLayout>
                    <AuthListener>
                        <Switch>
                            <Route path="/o/">
                                <OrganizationsApp />
                            </Route>
                            <Route path="/a/">
                                <AuthApp />
                            </Route>
                            <Route exact path="/slackResult/">
                                <SlackResult />
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
