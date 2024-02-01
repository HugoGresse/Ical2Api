import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import OrganizationList from './orgs/OrganizationList'
import OrganizationsLoading from './OrganizationsLoading'
import { useStateValue } from '../state/state'
import OrgBreadcrumb from './OrgBreadcrumb'
import OrganizationApp from './org/OrganizationApp'
import ErrorTrucificator from './ErrorTrucificator'
import CircularProgress from '@material-ui/core/CircularProgress'

const OrganizationsApp = () => {
    const [
        {
            auth: { user },
            organizationsLoading,
        },
    ] = useStateValue()
    const { url } = useRouteMatch()

    return (
        <OrganizationsLoading userId={user && user.uid}>
            <OrgBreadcrumb />
            <ErrorTrucificator />
            {organizationsLoading && <CircularProgress />}
            <Switch>
                <Route exact path={`${url}/`}>
                    <OrganizationList />
                </Route>
                <Route path={`${url}/:organizationId/`}>
                    <OrganizationApp />
                </Route>
            </Switch>
        </OrganizationsLoading>
    )
}

export default OrganizationsApp
