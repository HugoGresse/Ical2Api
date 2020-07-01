import React from 'react'
import { useStateValue } from '../state/state'
import Grid from '@material-ui/core/Grid'
import OrganizationItem from './OrganizationItem'
import Box from '@material-ui/core/Box'

const OrganizationList = () => {
    const [{ organizations }] = useStateValue()

    return (
        <Box>
            <Grid container spacing={4}>
                {Object.keys(organizations).map(id => (
                    <OrganizationItem
                        key={id}
                        organization={organizations[id]}
                    />
                ))}
            </Grid>
        </Box>
    )
}

export default OrganizationList
