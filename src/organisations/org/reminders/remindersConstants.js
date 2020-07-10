export const ReminderType = {
    hour: {
        id: 'hour',
        name: 'Hourly',
        desc:
            'Send a reminder X hour(s) before any event (you can set 24h to be reminded of an event happening the next day)',
    },
    weekly: {
        id: 'weekly',
        name: 'Weekly',
        desc: 'Sumup of all event happening on a week',
    },
    created: {
        id: 'created',
        name: 'Creation',
        desc:
            'Reminder when a new event is added by the crawler (every 15-30 min)',
    },
}
