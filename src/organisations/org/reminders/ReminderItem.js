import React from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { LeadPencil } from 'mdi-material-ui'

const ReminderItem = ({ reminder, onReminderEdit }) => {
    return (
        <Grid item xs={12} sm={4} md={4} component={Box} display="flex">
            <Box flex={1}>
                <Typography variant="h6">{reminder.type}</Typography>
            </Box>
            <Box display="flex" flexDirection="column">
                <IconButton
                    aria-label="edit ical"
                    onClick={() => onReminderEdit(reminder)}>
                    <LeadPencil />
                </IconButton>
            </Box>
        </Grid>
    )
}

export default ReminderItem
