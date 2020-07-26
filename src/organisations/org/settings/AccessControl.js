import React from 'react'
import AccessControlForm from './AccessControlForm'
import { useOrganizationPrivateData } from '../../../state/stateHooks'
import CircularProgress from '@material-ui/core/CircularProgress'

const AccessControl = ({ organization, dispatch, user }) => {
    const [loading, organizationPrivateData] = useOrganizationPrivateData()

    if (loading || !organizationPrivateData) {
        return <CircularProgress />
    }

    return (
        <AccessControlForm
            organization={organization}
            organizationPrivateData={organizationPrivateData}
            dispatch={dispatch}
            user={user}
        />
    )
}

export default AccessControl
