import React from 'react'
import RemindersLoading from './RemindersLoading'
import { useStateValue } from '../../../state/state'
import { CircularProgress } from '@material-ui/core'
import RemindersInnerTabs from './RemindersInnerTabs'
import {
    deleteReminder,
    editReminder,
    newReminder,
} from '../../actions/actions'
import Typography from '@material-ui/core/Typography'

const Reminders = () => {
    const [
        {
            selectedOrganization: { id, reminders, remindersLoading },
        },
        dispatch,
    ] = useStateValue()

    return (
        <RemindersLoading>
            {remindersLoading && <CircularProgress />}

            <RemindersInnerTabs
                reminders={reminders}
                onNewReminder={values =>
                    newReminder(
                        {
                            ...values,
                            organizationId: id,
                        },
                        dispatch
                    )
                }
                onEditReminder={values => editReminder(values, dispatch)}
                onDelete={reminder => deleteReminder(reminder, dispatch)}
            />

            <Typography variant="body2" style={{ marginTop: 16 }}>
                Reminders are sent at o'clock sharp, creation reminder at
                minutes 15 and 45.
            </Typography>
        </RemindersLoading>
    )
}

export default Reminders
