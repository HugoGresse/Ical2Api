import React from 'react'
import Grid from '@material-ui/core/Grid'
import { useStateValue } from '../../../state/state'
import Event from './Event'
import { selectPassedEvents } from '../../../state/selectors'
import Typography from '@material-ui/core/Typography'

const PassedEvents = () => {
    const [
        {
            selectedOrganization: { icals, events, eventsLoading },
        },
    ] = useStateValue()

    const passedEvents = selectPassedEvents(events)

    return (
        <Grid container spacing={4}>
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
