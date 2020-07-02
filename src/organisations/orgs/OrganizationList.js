import React, { useState } from 'react'
import { useStateValue } from '../../state/state'
import Grid from '@material-ui/core/Grid'
import OrganizationItem from './OrganizationItem'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import NewOrganization from './NewOrganization'

const OrganizationList = () => {
    const [isAddDialogOpen, setAddDialogOpen] = useState(false)
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
                <Grid item>
                    <Button onClick={() => setAddDialogOpen(true)}>
                        Create a new organization
                    </Button>
                </Grid>
            </Grid>
            <NewOrganization
                open={isAddDialogOpen}
                onClose={() => setAddDialogOpen(false)}
            />
        </Box>
    )
}

export default OrganizationList
