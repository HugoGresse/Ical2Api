import React, { useState } from 'react'
import { SimpleDialog } from '../../../sharedComponents/SimpleDialog'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { functions } from '../../../utils/firebase'
import { CircularProgress } from '@material-ui/core'
import Event from '../event/Event'

const IcalManualFetch = ({ ical, onCancel, open }) => {
    const [inProgress, setInProgress] = useState(false)
    const [events, setEvents] = useState(null)
    const [error, setError] = useState(null)

    const fetchIt = async () => {
        setEvents(null)
        setError(null)
        setInProgress(true)
        try {
            const results = await functions.getUpcomingEventManually({
                organizationId: ical.organizationId,
                icalId: ical.id,
            })
            setEvents(results.data)
            console.log('Fetched events: ', results)
        } catch (error) {
            console.warn('Fetching upcoming events failed', error)
            setError(error)
        }
        setInProgress(false)
    }

    return (
        <SimpleDialog
            title="Get upcoming events"
            onCancel={onCancel}
            maxWidth="md"
            fullWidth={true}
            open={open}>
            <Typography>
                Do you want to fetch upcoming events on {ical.name}? (this will
                NOT update the database)
            </Typography>
            <pre>URL: {ical.url}</pre>
            <br />

            {inProgress && <CircularProgress />}

            {(events || error) && <Typography variant="h5">Result:</Typography>}
            {events && (
                <Typography variant="h5">Events: {events.length}</Typography>
            )}
            {error && <pre>Error: {error.toString()}</pre>}

            {events &&
                events.map(event => (
                    <Event key={event.id} ical={ical} event={event} />
                ))}

            <Box justifyContent="space-between" display="flex">
                <Button onClick={onCancel}>Close</Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={fetchIt}
                    disabled={inProgress}>
                    Yes!
                </Button>
            </Box>
        </SimpleDialog>
    )
}

export default IcalManualFetch
