import React from 'react'
import Grid from '@material-ui/core/Grid'
import { useStateValue } from '../../../state/state'
import Event from './Event'
import { selectPassedEvents } from '../../../state/selectors'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Link as RouterLink } from 'react-router-dom'
import { RoutingMap } from '../../../UseRoutingMap'

const PassedEvents = () => {
    const [
        {
            selectedOrganization: { id, icals, events, eventsLoading },
        },
    ] = useStateValue()

    const passedEvents = selectPassedEvents(events)
    const routing = RoutingMap(id).orgs.org.upcomingEvents

    return (
        <Grid container spacing={4}>
            {id && (
                <Grid item xs={12} style={{ textAlign: 'right' }}>
                    <Button
                        to={routing.url}
                        component={RouterLink}
                        variant="outlined"
                        color="primary">
                        {routing.name}
                    </Button>
                </Grid>
            )}
            {passedEvents.map(event => (
                <Event
                    key={event.id}
                    ical={icals.filter(ical => event.icalId === ical.id)[0]}
                    event={event}
                />
            ))}
            {passedEvents.length === 0 && (
                <Grid item>
                    {eventsLoading && (
                        <Typography>Events loading...</Typography>
                    )}
                    {!eventsLoading && (
                        <Typography>No passed events</Typography>
                    )}
                </Grid>
            )}
        </Grid>
    )
}

export default PassedEvents
