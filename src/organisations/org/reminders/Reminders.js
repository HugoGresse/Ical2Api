import React from 'react'
import RemindersLoading from './RemindersLoading'
import { useStateValue } from '../../../state/state'
import { CircularProgress } from '@material-ui/core'
import RemindersInnerTabs from './RemindersInnerTabs'

const Reminders = () => {
    const [
        {
            selectedOrganization: {
                reminders,
                remindersLoading,
                lastUseSlackWebHook,
            },
        },
    ] = useStateValue()

    return (
        <RemindersLoading>
            {remindersLoading && <CircularProgress />}

            <RemindersInnerTabs
                reminders={reminders}
                defaultSlackWebHook={lastUseSlackWebHook}
            />
        </RemindersLoading>
    )
}

export default Reminders
