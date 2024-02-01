import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import {
    FileFind,
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
import IcalManualFetch from './IcalManualFetch'
import RequireLogin from '../../../auth/RequireLogin'
import AddEditIcalDialog from './AddEditIcalDialog'

const Ical = ({ ical, events }) => {
    const upcomingEvents = countUpcomingEvents(events)
    const passedEvents = countPassedEvents(events)
    const [manualFetchOpen, setManualFetchOpen] = useState(false)
    const [editingIcal, setEditingIcal] = useState(null)

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
            <RequireLogin>
                <Box display="flex" flexDirection="column">
                    <IconButton
                        aria-label="get upcoming events"
                        onClick={() => setManualFetchOpen(true)}>
                        <FileFind />
                    </IconButton>
                    <IconButton
                        aria-label="edit ical"
                        onClick={() => setEditingIcal(ical)}>
                        <LeadPencil />
                    </IconButton>
                </Box>
                <IcalManualFetch
                    ical={ical}
                    onCancel={() => setManualFetchOpen(false)}
                    open={manualFetchOpen}
                />
                <AddEditIcalDialog
                    onCancel={() => setEditingIcal(null)}
                    open={!!editingIcal}
                    ical={ical}
                />
            </RequireLogin>
        </Grid>
    )
}

export default Ical
