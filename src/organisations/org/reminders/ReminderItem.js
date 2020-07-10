import React from 'react'
import ReminderAddEdit from './ReminderAddEdit'

const ReminderItem = ({
    reminder,
    reminderType,
    defaultSlackWebHook,
    onReminderEdit,
}) => {
    return (
        <ReminderAddEdit
            reminder={reminder}
            reminderType={reminderType || reminder.type}
            defaultSlackWebHook={defaultSlackWebHook}
        />
    )
}

export default ReminderItem
