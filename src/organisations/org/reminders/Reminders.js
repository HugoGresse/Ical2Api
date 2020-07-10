import React, { useState } from 'react'
import RemindersLoading from './RemindersLoading'
import { useStateValue } from '../../../state/state'
import { CircularProgress } from '@material-ui/core'
import RemindersInnerTabs from './RemindersInnerTabs'

const Reminders = () => {
    const [
        {
            selectedOrganization: { reminders, remindersLoading },
        },
    ] = useStateValue()
    const [dialogOpen, setDialogOpen] = useState(false)

    return (
        <RemindersLoading>
            {remindersLoading && <CircularProgress />}

            <RemindersInnerTabs reminders={reminders} />
        </RemindersLoading>
    )
}

export default Reminders
