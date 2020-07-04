import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import {
    DatabaseRefresh,
    LeadPencil,
    CalendarCheck,
    CalendarClock,
} from 'mdi-material-ui'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import {
    countPassedEvents,
    countUpcomingEvents,
} from '../../../state/selectors'

const Ical = ({ ical, events }) => {
    const upcomingEvents = countUpcomingEvents(events)
    const passedEvents = countPassedEvents(events)

    return (
        <Grid item xs={12} sm={4} md={4} component={Box} display="flex">
            <Box flex={1}>
                <Typography variant="h6">{ical.name}</Typography>
                <Box>
                    <Box>
                        <CalendarClock
                            style={{
                                top: 6,
                                marginRight: 4,
                                position: 'relative',
                            }}
                        />
                        {upcomingEvents} upcoming event
                    </Box>
                    <Box>
                        <CalendarCheck
                            style={{
                                top: 6,
                                marginRight: 4,
                                position: 'relative',
                            }}
                        />
                        {passedEvents} passed events
                    </Box>
                </Box>
            </Box>
            <Box display="flex" flexDirection="column">
                <IconButton aria-label="refresh ical events">
                    <DatabaseRefresh />
                </IconButton>
                <IconButton aria-label="edit ical">
                    <LeadPencil />
                </IconButton>
            </Box>
        </Grid>
    )
}

export default Ical
