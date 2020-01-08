import React from 'react'
import Ical from './Ical'
import Grid from '@material-ui/core/Grid'
import { useStateValue } from '../state/state'

const IcalList = () => {
    const [{ icals, events }] = useStateValue()

    return (
        <Grid container spacing={4}>
            {icals.map(ical => (
                <Ical
                    key={ical.id}
                    ical={ical}
                    events={events.filter(event => event.icalId === ical.id)}
                />
            ))}
        </Grid>
    )
}

export default IcalList
