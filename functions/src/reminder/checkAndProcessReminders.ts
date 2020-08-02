import { processWeeklyReminder } from './processWeeklyReminder'
import { processHourlyReminder } from './processHourlyReminder'
import {
    REMINDER_CREATED,
    REMINDER_HOUR,
    REMINDER_WEEKLY,
} from '../types/Reminder'
import { getReminders } from '../dbGetters/getReminders'

export const checkAndProcessReminders = async () => {
    console.log('> getRemindersToTrigger')
    const dbReminders = await getReminders()

    for (const reminder of dbReminders) {
        switch (reminder.type) {
            case REMINDER_WEEKLY:
                await processWeeklyReminder(reminder)
                break
            case REMINDER_HOUR:
                await processHourlyReminder(reminder)
                break
            case REMINDER_CREATED:
                // Do nothing, specific triggers
                break
            default:
                console.error(`Reminder type ${reminder.type} not managed`)
        }
    }
}
