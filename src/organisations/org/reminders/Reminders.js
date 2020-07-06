import React, { useState } from 'react'
import ReminderList from './ReminderList'
import RemindersLoading from './RemindersLoading'
import { useStateValue } from '../../../state/state'
import { CircularProgress } from '@material-ui/core'

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
            <ReminderList reminders={reminders} />
        </RemindersLoading>
    )
}

export default Reminders
