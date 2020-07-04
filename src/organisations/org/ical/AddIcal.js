import React from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'

const AddIcall = ({ onClick }) => {
    return (
        <Grid item xs={12} sm={4} md={4} component={Box} display="flex">
            <Button
                variant="contained"
                color="secondary"
                startIcon={<AddIcon />}
                onClick={onClick}>
                Add iCal
            </Button>
        </Grid>
    )
}

export default AddIcall
