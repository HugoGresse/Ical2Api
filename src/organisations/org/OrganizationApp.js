import React, { useEffect } from 'react'
import { useStateValue } from '../../state/state'
import {
    Redirect,
    Route,
    Switch,
    useParams,
    useRouteMatch,
} from 'react-router-dom'
import SingleOrgDataLoading from './SingleOrgDataLoading'
import IcalList from './ical/IcalList'
import UpcomingEvents from './event/UpcomingEvents'
import OrgMenu from './OrgMenu'
import Reminders from './reminders/Reminders'
import OrgSettings from './settings/OrgSettings'
import PassedEvents from './event/PassedEvents'

const OrganizationApp = () => {
    const { organizationId } = useParams()
    const [, dispatch] = useStateValue()
    const { url } = useRouteMatch('/o/:orgId')

    useEffect(() => {
        dispatch({
            domain: 'org',
            type: 'selected',
            payload: { id: organizationId },
        })
    }, [dispatch, organizationId])

    return (
        <SingleOrgDataLoading>
            <OrgMenu />
            <Switch>
                <Redirect exact from={url} to={`${url}/events-upcoming`} />
                <Route path={`${url}/icals`}>
                    <IcalList />
                </Route>
                <Route path={`${url}/events-upcoming`}>
                    <UpcomingEvents />
                </Route>
                <Route path={`${url}/events-passed`}>
                    <PassedEvents />
                </Route>
                <Route path={`${url}/reminders`}>
                    <Reminders />
                </Route>
                <Route path={`${url}/settings`}>
                    <OrgSettings />
                </Route>
            </Switch>
        </SingleOrgDataLoading>
    )
}

export default OrganizationApp
