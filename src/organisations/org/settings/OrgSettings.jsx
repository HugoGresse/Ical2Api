import React from 'react'
import { useStateValue } from '../../../state/state'
import { CircularProgress } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import OrgSettingsForm from './OrgSettingsForm'
import AccessControl from './AccessControl'
import OrgPrivateDataLoading from './OrgPrivateDataLoading'

const OrgSettings = () => {
    const [
        {
            selectedOrganization: { id },
            organizations,
            auth: { user },
        },
        dispatch,
    ] = useStateValue()

    if (!id || !organizations[id]) {
        return <CircularProgress />
    }

    const org = organizations[id]

    return (
        <>
            <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                    <OrgSettingsForm org={org} dispatch={dispatch} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <OrgPrivateDataLoading organizationId={id}>
                        <AccessControl
                            organization={org}
                            dispatch={dispatch}
                            user={user}
                        />
                    </OrgPrivateDataLoading>
                </Grid>
            </Grid>
        </>
    )
}

export default OrgSettings
