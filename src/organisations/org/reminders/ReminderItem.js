import React from 'react'
import ReminderAddEdit from './ReminderAddEdit'

const ReminderItem = ({
    reminder,
    reminderType,
    defaultSlackWebHook,
    onSubmit,
    onDelete,
}) => {
    return (
        <ReminderAddEdit
            reminder={reminder}
            reminderType={reminderType || reminder.type}
            defaultSlackWebHook={defaultSlackWebHook}
            onSubmit={onSubmit}
            onDelete={onDelete}
        />
    )
}

export default ReminderItem
