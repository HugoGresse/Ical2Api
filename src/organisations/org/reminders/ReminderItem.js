import React from 'react'
import ReminderAddEdit from './ReminderAddEdit'

const ReminderItem = ({ reminder, onReminderEdit }) => {
    return <ReminderAddEdit reminder={reminder} reminderType={reminder.type} />
}

export default ReminderItem
