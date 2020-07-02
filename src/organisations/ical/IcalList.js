import React from 'react'
import Ical from './Ical'
import Grid from '@material-ui/core/Grid'
import { useStateValue } from '../../state/state'
import Box from '@material-ui/core/Box'
import { Link as RouterLink, useRouteMatch } from 'react-router-dom'
import Button from '@material-ui/core/Button'

const IcalList = () => {
    const { url } = useRouteMatch()
    const [
        {
            selectedOrganization: { icals, events },
        },
    ] = useStateValue()

    return (
        <Box>
            <Button
                to={url.replace('icals', 'events')}
                component={RouterLink}
                variant="outlined"
                color="primary"
                style={{ marginBottom: 16 }}>
                See all events in the organization
            </Button>
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
            </Grid>
        </Box>
    )
}

export default IcalList
