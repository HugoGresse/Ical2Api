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
    slackWebHook: string
    type: ReminderType
    timezone: string
    language: string
    weekday?: number
    hours?: number
}
