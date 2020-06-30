import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import { StateProvider } from './state/state'
import OrganizationApp from './OrganizationApp'
import Home from './home/Home'
import AuthApp from './auth/AuthApp'
import AuthListener from './auth/AuthListener'

const App = () => {
    const initialState = {
        icals: [],
        events: [],
        organization: {},
        auth: {
            loggedIn: false,
            user: null,
        },
    }

    const reducer = (state, action) => {
        switch (action.domain) {
            case 'auth':
                switch (action.type) {
                    case 'login':
                        return {
                            ...state,
                            auth: {
                                ...state.auth,
                                loggedIn: true,
                                user: action.payload.user,
                            },
                        }
                    case 'logout':
                        return {
                            ...state,
                            auth: {
                                ...state.auth,
                                loggedIn: false,
                                user: null,
                            },
                        }
                    default:
                        return state
                }
            default:
                switch (action.type) {
                    case 'icalsLoaded':
                        return {
                            ...state,
                            icals: action.payload,
                        }
                    case 'eventsLoaded':
                        return {
                            ...state,
                            events: action.payload,
                        }
                    case 'organizationLoaded':
                        return {
                            ...state,
                            organization: action.payload,
                        }
                    default:
                        return state
                }
        }
    }

    return (
        <BrowserRouter>
            <StateProvider initialState={initialState} reducer={reducer}>
                <AppLayout>
                    <AuthListener>
                        <Switch>
                            <Route path="/o/:organizationId">
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
