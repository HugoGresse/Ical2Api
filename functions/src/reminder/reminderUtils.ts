import { db } from '../utils/initFirebase'
import { DateTime } from 'luxon'
import { Event } from '../eventUpdater/Event'
import { getOrganization } from '../utils/dbGetters'
import { postMessageToSlack } from './slack/postMessageToSlack'
import { formatMessageForSlack } from './slack/formatMessageForSlack'

export const REMINDER_HOUR: 'hour' = 'hour'
export const REMINDER_WEEKLY: 'weekly' = 'weekly'
export const REMINDER_CREATED: 'created' = 'created'

export type ReminderType =
    | typeof REMINDER_HOUR
    | typeof REMINDER_WEEKLY
    | typeof REMINDER_CREATED

export interface Reminder {
    id: string
    organizationId: string
    type: ReminderType
    timezone: string
    weekday?: number
    hours?: number
}

export interface Organization {
    id: string
    name: string
    privateData: OrganizationPrivateData
}

export interface OrganizationPrivateData {
    id: string
    organizationId: string
    slackWebHook: string
}

export const getReminders = async (): Promise<Reminder[]> => {
    const snapshots = await db.collection('reminders').get()

    return Promise.resolve(
        snapshots.docs.map(ref => ({ id: ref.id, ...ref.data() } as Reminder))
    )
}

export const getEventsBetween = async (
    organizationId: string,
    fromDate: DateTime,
    toDate: DateTime
): Promise<Event[]> => {
    const eventsSnapshot = await db
        .collection('events')
        .where('organizationId', '==', organizationId)
        .where('startDate', '>=', fromDate.toMillis())
        .where('startDate', '<', toDate.toMillis())
        .orderBy('startDate', 'asc')
        .get()

    return eventsSnapshot.docs.map(
        ref => ({ id: ref.id, ...ref.data() } as Event)
    )
}

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

    const organization = await getOrganization(reminder.organizationId)
    if (organization) {
        return postReminder(
            events,
            reminder,
            organization.privateData.slackWebHook
        )
    }
    return Promise.reject('Organization not found')
}

export const postReminder = async (
    events: Event[],
    reminder: Reminder,
    slackWebHookUrl: string
): Promise<void> => {
    if (!slackWebHookUrl) {
        return Promise.reject('Slack webhook url is not configured')
    }

    return postMessageToSlack(
        formatMessageForSlack(reminder, events),
        slackWebHookUrl
    )
}
