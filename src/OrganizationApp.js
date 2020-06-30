import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import IcalList from './ical/IcalList'
import UpcomingEvents from './event/UpcomingEvents'
import DataLoading from './DataLoading'

const OrganizationApp = () => {
    const { path } = useRouteMatch()

    return (
        <DataLoading>
            <Switch>
                <Route path={`${path}/icals`}>
                    <IcalList />
                </Route>
                <Route path={path}>
                    <UpcomingEvents />
                </Route>
            </Switch>
        </DataLoading>
    )
}

export default OrganizationApp
