import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import OrganizationList from '../organisations/orgs/OrganizationList'
import OrganizationsLoading from '../organisations/OrganizationsLoading'
import { useStateValue } from '../state/state'
import OrgBreadcrumb from '../organisations/OrgBreadcrumb'
import OrganizationDetail from '../organisations/org/OrganizationDetail'
import ErrorTrucificator from '../organisations/ErrorTrucificator'

const OrganizationApp = () => {
    const [
        {
            auth: { user },
        },
    ] = useStateValue()
    const { url } = useRouteMatch()

    return (
        <OrganizationsLoading userId={user && user.uid}>
            <OrgBreadcrumb />
            <ErrorTrucificator />
            <Switch>
                <Route exact path={`${url}/`}>
                    <OrganizationList />
                </Route>
                <Route path={`${url}/:organizationId/`}>
                    <OrganizationDetail />
                </Route>
            </Switch>
        </OrganizationsLoading>
    )
}

export default OrganizationApp
