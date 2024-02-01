import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { MapMarker, CalendarClock } from 'mdi-material-ui'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import AddToCalendar from '@culturehq/add-to-calendar'
import './AddToCalendar.css'

const Event = ({ event }) => {
    const date = new Date(event.startDate)

    const exportedEvent = getEventForExport(event)

    return (
        <>
            <Grid item xs={12} sm={8}>
                <Box flex={1}>
                    <Typography variant="h5" style={{ color: 'red' }}>
                        {event.icalName}
                    </Typography>
                    <Typography variant="h4" style={{ fontFamily: 'Roboto' }}>
                        {event.title}
                    </Typography>
                    <Typography>{event.description}</Typography>

                    <Button
                        variant="contained"
                        disableElevation={true}
                        style={{
                            marginTop: 20,
                            backgroundColor: 'red',
                            color: 'white',
                        }}
                        href={event.url}
                        target="_blank">
                        View event
                    </Button>

                    <AddToCalendar
                        children="Add to my calendar"
                        event={exportedEvent}
                    />
                </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Box display="flex">
                    <Box>
                        <CalendarClock
                            style={{ marginRight: 6, color: 'red' }}
                        />
                    </Box>
                    <Box>
                        <Typography>
                            {date.toLocaleDateString(undefined, {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </Typography>

                        <Typography>
                            at{' '}
                            {date.toLocaleTimeString(undefined, {
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </Typography>
                    </Box>
                </Box>
                {event.location && (
                    <Box display="flex" marginTop={2}>
                        <Box>
                            <MapMarker
                                style={{ marginRight: 4, color: 'red' }}
                            />
                        </Box>
                        <Box>
                            <Typography>
                                <Link
                                    style={{ color: 'inherit' }}
                                    href={`https://maps.google.com/?q=${event.location}`}
                                    target="_blank">
                                    {event.location}
                                </Link>{' '}
                            </Typography>
                        </Box>
                    </Box>
                )}
            </Grid>
        </>
    )
}

const getEventForExport = event => {
    const startDate = new Date(event.startDate)
    const endDate = new Date(event.endDate)

    const data = {
        name: `${event.title} - ${event.icalName}`,
        details: `${event.title} - ${event.icalName}`,
        startsAt: startDate.toISOString(),
        endsAt: endDate.toISOString(),
    }

    if (event.location) {
        data.location = event.location
    }
    return data
}

export default Event
