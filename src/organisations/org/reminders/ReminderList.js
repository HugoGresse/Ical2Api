import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import ReminderItem from './ReminderItem'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'

const ReminderList = ({ reminders, onAddClick }) => {
    return (
        <Box>
            <Grid container spacing={4}>
                {reminders.map(reminder => (
                    <ReminderItem reminder={reminder} key={reminder.id} />
                ))}

                <Grid item xs={12} sm={4} md={4} component={Box} display="flex">
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={onAddClick}>
                        Add a reminder
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ReminderList
