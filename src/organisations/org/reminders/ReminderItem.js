import React from 'react'
import ReminderAddEdit from './ReminderAddEdit'

const ReminderItem = ({ reminder, reminderType, onSubmit, onDelete }) => {
    return (
        <ReminderAddEdit
            reminder={reminder}
            reminderType={reminderType || reminder.type}
            onSubmit={onSubmit}
            onDelete={onDelete}
        />
    )
}

export default ReminderItem
