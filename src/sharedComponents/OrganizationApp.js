import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import OrganizationList from '../organisations/orgs/OrganizationList'
import OrganizationLoading from '../organisations/OrganizationLoading'
import { useStateValue } from '../state/state'
import RequireLogin from '../auth/RequireLogin'
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
        <RequireLogin>
            <OrganizationLoading userId={user && user.uid}>
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
            </OrganizationLoading>
        </RequireLogin>
    )
}

export default OrganizationApp
