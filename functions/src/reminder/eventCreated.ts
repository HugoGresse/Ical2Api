import { getOrganization } from '../dbGetters/getOrganization'
import { postReminder } from './reminderUtils'
import { Event } from '../types/Event'
import { db } from '../utils/initFirebase'
import { Reminder, REMINDER_CREATED } from '../types/Reminder'

export const postCreatedEvent = async (event: Event) => {
    const reminderSnapshot = await db
        .collection('reminders')
        .where('organizationId', '==', event.organizationId)
        .where('type', '==', REMINDER_CREATED)
        .get()

    if (reminderSnapshot.docs.length <= 0) {
        // No created reminder setup for the org
        return Promise.reject()
    }
    const firstReminderSnapshot = reminderSnapshot.docs.pop()
    if (!firstReminderSnapshot) {
        return Promise.reject(
            'Reminder should exist but was undefined for event: ' +
                JSON.stringify(event)
        )
    }
    const reminder = {
        id: firstReminderSnapshot.id,
        ...firstReminderSnapshot.data(),
    } as Reminder

    const organization = await getOrganization(reminder.organizationId)
    if (organization) {
        return postReminder([event], reminder)
    }
    return Promise.reject('Organization not found')
}
