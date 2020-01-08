import React from 'react'
import Grid from '@material-ui/core/Grid'
import { useStateValue } from '../state/state'
import Event from './Event'
import { selectUpcomingEvents } from '../state/selectors'

const UpcomingEvents = () => {
    const [{ meetups, events }] = useStateValue()

    const upcomingEvents = selectUpcomingEvents(events)

    return (
        <Grid container spacing={4}>
            {upcomingEvents.map(event => (
                <Event
                    key={event.id}
                    meetup={
                        meetups.filter(
                            meetup => event.meetupId === meetup.id
                        )[0]
                    }
                    event={event}
                />
            ))}
        </Grid>
    )
}

export default UpcomingEvents
