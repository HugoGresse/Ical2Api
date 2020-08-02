import { DateTime } from 'luxon'
import { Event } from '../types/Event'
import { postMessageToSlack } from './slack/postMessageToSlack'
import { formatMessageForSlack } from './slack/formatMessageForSlack'
import { Reminder } from '../types/Reminder'
import { getEventsBetween } from '../dbGetters/getEventsBetween'

export const gatherEventsAndPostReminder = async (
    reminder: Reminder,
    fromDate: DateTime,
    toDate: DateTime
): Promise<void> => {
    const events = await getEventsBetween(
        reminder.organizationId,
        fromDate,
        toDate
    )
    console.log(`events count: ${events.length}`)
    events.forEach(e => console.log(`- ${e.id} - ${e.title}`))

    if (events.length <= 0) {
        return Promise.resolve()
    }
    return postReminder(events, reminder)
}

export const postReminder = async (
    events: Event[],
    reminder: Reminder
): Promise<void> => {
    return postMessageToSlack(
        formatMessageForSlack(reminder, events),
        reminder.slackWebHook
    )
}
