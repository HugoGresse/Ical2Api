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

const OrganizationDetail = () => {
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
            </Switch>
        </SingleOrgDataLoading>
    )
}

export default OrganizationDetail
