import React from 'react'
import Ical from './Ical'
import Grid from '@material-ui/core/Grid'
import { useStateValue } from '../state/state'

const IcalList = () => {
    const [{ meetups, events }] = useStateValue()

    return (
        <Grid container spacing={4}>
            {meetups.map(meetup => (
                <Ical
                    key={meetup.id}
                    meetup={meetup}
                    events={events.filter(
                        event => event.meetupId === meetup.id
                    )}
                />
            ))}
        </Grid>
    )
}

export default IcalList
