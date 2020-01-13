import {
    Reminder,
    REMINDER_CREATED,
    REMINDER_HOUR,
    REMINDER_WEEKLY,
} from '../reminderUtils'
import { DateTime } from 'luxon'
import { Event } from '../../eventUpdater/Event'
import { extractHostname } from '../../utils/extractHostname'

export const formatMessageForSlack = (
    reminder: Reminder,
    events: Event[]
): object[] => {
    const blocks: object[] = []

    switch (reminder.type) {
        case REMINDER_HOUR:
            blocks.push({
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `:wave: *${events.length}* évènement${
                        events.length > 1 ? 's' : ''
                    } dans ${reminder.hours}h:`,
                },
            })
            break
        case REMINDER_WEEKLY:
            blocks.push({
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `:wave: Il y a *${events.length}* évènement${
                        events.length > 1 ? 's' : ''
                    } cette semaine:`,
                },
            })
            break
        case REMINDER_CREATED:
            blocks.push({
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `:wave: Nouvel évènement créé:`,
                },
            })
            break
        default:
            console.error(
                `Reminder type ${reminder.type} not managed in formatMessageForSlack`
            )
            break
    }

    events.forEach(event => {
        const formatedDate = DateTime.fromMillis(event.startDate)
            .setLocale(reminder.language)
            .setZone(reminder.timezone)
            .toLocaleString({
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            })

        blocks.push({
            type: 'divider',
        })

        blocks.push({
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `:arrow_right: *${event.title}*\ndu meetup *${event.icalName}*.\n`,
            },
            accessory: {
                type: 'button',
                text: {
                    type: 'plain_text',
                    text: `Voir sur ${extractHostname(event.url)}`,
                    emoji: true,
                },
                url: event.url,
                action_id: 'button_ical_link_external',
            },
        })

        blocks.push({
            type: 'section',
            fields: [
                {
                    type: 'mrkdwn',
                    text: `*:clock1: Date*\n${formatedDate}`,
                },
                {
                    // https://maps.google.com/?q=${event.location}
                    type: 'mrkdwn',
                    text: `*:pushpin: Lieu*\n${
                        event.location
                            ? '<https://maps.google.com/?q=' +
                              event.location +
                              '|' +
                              event.location +
                              '>'
                            : '-'
                    }`,
                },
            ],
        })
    })

    blocks.push({
        type: 'context',
        elements: [
            {
                type: 'mrkdwn',
                text:
                    'Provided by <https://github.com/HugoGresse/Ical2Api|Ical2Api>',
            },
        ],
    })

    return blocks
}
