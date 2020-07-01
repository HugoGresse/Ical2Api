import React from 'react'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import IcalList from './IcalList'
import UpcomingEvents from '../../event/UpcomingEvents'
import IcalDataLoading from './IcalDataLoading'

const IcalApp = () => {
    const { url } = useRouteMatch()

    return (
        <IcalDataLoading>
            <Switch>
                <Route path={`${url}/icals`}>
                    <IcalList />
                </Route>
                <Route path={`${url}/events`}>
                    <UpcomingEvents />
                </Route>
                <Redirect exact from={url} to={`${url}/icals`} />
            </Switch>
        </IcalDataLoading>
    )
}

export default IcalApp
