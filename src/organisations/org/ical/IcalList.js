import React, { useState } from 'react'
import Ical from './Ical'
import Grid from '@material-ui/core/Grid'
import { useStateValue } from '../../../state/state'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import AddIcall from './AddIcal'
import NewIcalDialog from './NewIcalDialog'

const IcalList = () => {
    const [
        {
            selectedOrganization: { icals, events, icalsLoading },
        },
    ] = useStateValue()
    const [dialogOpen, setDialogOpen] = useState(false)

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
                    </Grid>
                )}
                <AddIcall onClick={() => setDialogOpen(true)} />
                <NewIcalDialog
                    open={dialogOpen}
                    onCancel={() => setDialogOpen(false)}
                />
            </Grid>
        </Box>
    )
}

export default IcalList
