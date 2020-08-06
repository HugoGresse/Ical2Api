import React from 'react'
import Grid from '@material-ui/core/Grid'
import { useStateValue } from '../../../state/state'
import Event from './Event'
import {
    selectPassedEvents,
    selectUpcomingEvents,
} from '../../../state/selectors'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Link as RouterLink } from 'react-router-dom'
import { RoutingMap } from '../../../UseRoutingMap'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'

const UpcomingEvents = ({ token }) => {
    const [
        {
            selectedOrganization: { id, icals, events, eventsLoading },
        },
    ] = useStateValue()

    const upcomingEvents = selectUpcomingEvents(events)
    const passedEvents = selectPassedEvents(events)
    const routing = RoutingMap(id).orgs.org.passedEvents
    const passedUrl = token ? `${routing.url}?token=${token}` : routing.url

    return (
        <Grid container spacing={4}>
            {id && (
                <Grid item xs={12} style={{ textAlign: 'right' }}>
                    <Button
                        to={passedUrl}
                        component={RouterLink}
                        variant="outlined"
                        color="primary">
                        See {routing.name}{' '}
                        {passedEvents && `(${passedEvents.length})`}
                    </Button>
                </Grid>
            )}
            {upcomingEvents.map(event => (
                <Event
                    key={event.id}
                    ical={icals.filter(ical => event.icalId === ical.id)[0]}
                    event={event}
                />
            ))}
            {upcomingEvents.length === 0 && (
                <Grid item>
                    {eventsLoading && (
                        <Box display="flex" alignItems="center">
                            <CircularProgress style={{ marginRight: 16 }} />
                            <Typography>Events loading...</Typography>
                        </Box>
                    )}
                    {!eventsLoading && (
                        <Typography>No upcoming events</Typography>
                    )}
                </Grid>
            )}
        </Grid>
    )
}

export default UpcomingEvents
