import React from 'react'
import ReminderAddEdit from './ReminderAddEdit'

const ReminderItem = ({
    reminder,
    reminderType,
    defaultSlackWebHook,
    onSubmit,
}) => {
    return (
        <ReminderAddEdit
            reminder={reminder}
            reminderType={reminderType || reminder.type}
            defaultSlackWebHook={defaultSlackWebHook}
            onSubmit={onSubmit}
        />
    )
}

export default ReminderItem
