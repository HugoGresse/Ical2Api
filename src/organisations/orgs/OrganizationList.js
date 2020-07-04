import React, { useState } from 'react'
import { useStateValue } from '../../state/state'
import Grid from '@material-ui/core/Grid'
import OrganizationItem from './OrganizationItem'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import NewOrganization from './NewOrganization'
import RequireLogin from '../../auth/RequireLogin'
import AddIcon from '@material-ui/icons/Add'

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
                    <RequireLogin displayLoginMessage={true}>
                        <Button onClick={() => setAddDialogOpen(true)}>
                            <AddIcon />
                            Create a new organization
                        </Button>
                        <NewOrganization
                            open={isAddDialogOpen}
                            onClose={() => setAddDialogOpen(false)}
                        />
                    </RequireLogin>
                </Grid>
            </Grid>
        </Box>
    )
}

export default OrganizationList
