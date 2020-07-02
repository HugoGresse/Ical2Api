import React from 'react'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import IcalList from './IcalList'
import UpcomingEvents from '../../event/UpcomingEvents'
import IcalDataLoading from './IcalDataLoading'

const IcalApp = () => {
    const { url } = useRouteMatch('/o/:orgId')
    return (
        <IcalDataLoading>
            <Switch>
                <Redirect exact from={url} to={`${url}/icals`} />
                <Route path={`${url}/icals`}>
                    <IcalList />
                </Route>
                <Route path={`${url}/events`}>
                    <UpcomingEvents />
                </Route>
            </Switch>
        </IcalDataLoading>
    )
}

export default IcalApp
