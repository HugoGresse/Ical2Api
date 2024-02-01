import React, { useState } from 'react'
import Ical from './Ical'
import Grid from '@material-ui/core/Grid'
import { useStateValue } from '../../../state/state'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import AddIcall from './AddIcal'
import AddEditIcalDialog from './AddEditIcalDialog'
import InfoIcon from '@material-ui/icons/Info'
import RequireLogin from '../../../auth/RequireLogin'

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

                <RequireLogin>
                    <AddIcall onClick={() => setDialogOpen(true)} />
                    <AddEditIcalDialog
                        open={dialogOpen}
                        onCancel={() => setDialogOpen(false)}
                    />
                </RequireLogin>

                <Grid
                    item
                    xs={12}
                    style={{ background: '#DDD', borderRadius: 6 }}>
                    <Typography variant="body2">
                        <InfoIcon
                            style={{
                                top: 6,
                                marginRight: 6,
                                position: 'relative',
                            }}
                        />
                        iCal are fetched every 30 minutes, at minutes 15 and 45.
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default IcalList
