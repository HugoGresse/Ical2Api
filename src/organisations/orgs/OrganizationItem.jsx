import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'

const OrganizationItem = ({ organization }) => {
    return (
        <Grid item>
            <Link
                component={RouterLink}
                to={`/o/${organization.id}`}
                style={{ textDecoration: 'none' }}>
                <Button variant="outlined">{organization.name}</Button>
            </Link>
        </Grid>
    )
}

export default OrganizationItem
