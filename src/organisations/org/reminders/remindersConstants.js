export const type = {
    hour: {
        id: 'hour',
        name: 'Hourly',
        desc:
            'Send a reminder X hour(s) before any event (you can set 24h for a next day reminder)',
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
            'Reminder when a new event is added from the crawler (within 15-30 min delay)',
    },
}
