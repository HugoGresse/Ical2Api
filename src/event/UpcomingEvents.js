import React from 'react'
import Grid from '@material-ui/core/Grid'
import { useStateValue } from '../state/state'
import Event from './Event'
import { selectUpcomingEvents } from '../state/selectors'

const UpcomingEvents = () => {
    const [
        {
            selectedOrganization: { icals, events },
        },
    ] = useStateValue()

    const upcomingEvents = selectUpcomingEvents(events)

    console.log(icals, events, upcomingEvents)
    return (
        <Grid container spacing={4}>
            {upcomingEvents.map(event => (
                <Event
                    key={event.id}
                    ical={icals.filter(ical => event.icalId === ical.id)[0]}
                    event={event}
                />
            ))}
        </Grid>
    )
}

export default UpcomingEvents
