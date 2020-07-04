import React from 'react'
import Ical from './Ical'
import Grid from '@material-ui/core/Grid'
import { useStateValue } from '../../../state/state'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

const IcalList = () => {
    const [
        {
            selectedOrganization: { icals, events, icalsLoading },
        },
    ] = useStateValue()

    return (
        <Box>
            <Grid container spacing={4}>
                {icals.map(ical => (
                    <Ical
                        key={ical.id}
                        ical={ical}
                        events={events.filter(
                            event => event.icalId === ical.id
                        )}
                    />
                ))}
                {icals.length === 0 && (
                    <Grid item>
                        {icalsLoading && (
                            <Typography>iCals loading...</Typography>
                        )}
                        {!icalsLoading && <Typography>No iCals</Typography>}
                    </Grid>
                )}
            </Grid>
        </Box>
    )
}

export default IcalList
