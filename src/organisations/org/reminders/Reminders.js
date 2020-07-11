import React from 'react'
import RemindersLoading from './RemindersLoading'
import { useStateValue } from '../../../state/state'
import { CircularProgress } from '@material-ui/core'
import RemindersInnerTabs from './RemindersInnerTabs'
import { editReminder, newReminder } from '../../actions/actions'

const Reminders = () => {
    const [
        {
            selectedOrganization: {
                id,
                reminders,
                remindersLoading,
                lastUseSlackWebHook,
            },
        },
        dispatch,
    ] = useStateValue()

    return (
        <RemindersLoading>
            {remindersLoading && <CircularProgress />}

            <RemindersInnerTabs
                reminders={reminders}
                defaultSlackWebHook={lastUseSlackWebHook}
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
            />
        </RemindersLoading>
    )
}

export default Reminders
