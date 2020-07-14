import React from 'react'
import { useStateValue } from '../../../state/state'
import { CircularProgress } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import OrgSettingsForm from './OrgSettingsForm'

const OrgSettings = () => {
    const [
        {
            selectedOrganization: { id },
            organizations,
        },
        dispatch,
    ] = useStateValue()

    if (!id || !organizations[id]) {
        return <CircularProgress />
    }

    const org = organizations[id]

    return (
        <>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <OrgSettingsForm org={org} dispatch={dispatch} />
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12} sm={6}></Grid>
            </Grid>
        </>
    )
}

export default OrgSettings
