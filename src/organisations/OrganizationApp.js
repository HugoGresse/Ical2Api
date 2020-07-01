import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import OrganizationList from './OrganizationList'
import OrganizationLoading from './OrganizationLoading'
import { useStateValue } from '../state/state'
import RequireLogin from '../auth/RequireLogin'
import OrgBreadcrumb from './OrgBreadcrumb'
import OrganizationDetail from './OrganizationDetail'

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
