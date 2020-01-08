import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import { StateProvider } from './state/state'
import OrganizationApp from './OrganizationApp'

const App = () => {
    const initialState = {
        meetups: [],
        events: [],
        organization: {},
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'meetupsLoaded':
                return {
                    ...state,
                    meetups: action.payload,
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

    return (
        <BrowserRouter>
            <StateProvider initialState={initialState} reducer={reducer}>
                <AppLayout>
                    <Switch>
                        <Route path="/o/:organizationId">
                            <OrganizationApp />
                        </Route>
                        <Route parth="*">
                            <div>404</div>
                        </Route>
                    </Switch>
                </AppLayout>
            </StateProvider>
        </BrowserRouter>
    )
}

export default App
