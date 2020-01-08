import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import MeetupList from './ical/MeetupList'
import UpcomingEvents from './event/UpcomingEvents'
import DataLoading from './DataLoading'

const OrganizationApp = () => {
    let { path } = useRouteMatch()

    return (
        <DataLoading>
            <Switch>
                <Route path={`${path}/icals`}>
                    <MeetupList />
                </Route>
                <Route path={path}>
                    <UpcomingEvents />
                </Route>
            </Switch>
        </DataLoading>
    )
}

export default OrganizationApp
