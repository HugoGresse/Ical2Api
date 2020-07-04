import React from 'react'
import Grid from '@material-ui/core/Grid'
import { useStateValue } from '../../../state/state'
import Event from './Event'
import { selectUpcomingEvents } from '../../../state/selectors'
import Typography from '@material-ui/core/Typography'

const UpcomingEvents = () => {
    const [
        {
            selectedOrganization: { icals, events, eventsLoading },
        },
    ] = useStateValue()

    const upcomingEvents = selectUpcomingEvents(events)

    return (
        <Grid container spacing={4}>
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
                        <Typography>Events loading...</Typography>
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
