import React, { useEffect } from 'react'
import { useSelectedOrganization, useStateValue } from '../../state/state'
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
import { useQuery } from '../../utils/router'
import ErrorInfo, { TYPE_ERROR } from '../../sharedComponents/ErrorInfo'

const OrganizationApp = () => {
    const { organizationId } = useParams()
    const [, dispatch] = useStateValue()
    const organization = useSelectedOrganization()
    const { url } = useRouteMatch('/o/:orgId')
    const query = useQuery()
    const token = query.get('token')

    const hasError = organization && !!organization.loadError

    useEffect(() => {
        dispatch({
            domain: 'org',
            type: 'selected',
            payload: { id: organizationId },
        })
    }, [dispatch, organizationId])

    return (
        <SingleOrgDataLoading token={token}>
            {hasError ? (
                <ErrorInfo
                    errorMessage={organization && organization.loadError}
                    type={TYPE_ERROR}
                />
            ) : (
                getOrgContent(url, token)
            )}
        </SingleOrgDataLoading>
    )
}

const getOrgContent = (url, token) => {
    return (
        <>
            <OrgMenu />
            <Switch>
                <Redirect exact from={url} to={`${url}/events-upcoming`} />
                <Route path={`${url}/icals`}>
                    <IcalList />
                </Route>
                <Route path={`${url}/events-upcoming`}>
                    <UpcomingEvents token={token} />
                </Route>
                <Route path={`${url}/events-passed`}>
                    <PassedEvents token={token} />
                </Route>
                <Route path={`${url}/reminders`}>
                    <Reminders />
                </Route>
                <Route path={`${url}/settings`}>
                    <OrgSettings />
                </Route>
            </Switch>
        </>
    )
}

export default OrganizationApp
