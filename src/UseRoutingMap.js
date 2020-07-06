import { useParams } from 'react-router-dom'

export const useRoutingMap = () => {
    const { organizationId } = useParams()
    return RoutingMap(organizationId)
}

export const RoutingMap = orgId => ({
    orgs: {
        base: {
            name: 'Organizations',
            url: '/o',
        },
        org: {
            root: {
                name: 'Upcoming events',
                url: `/o/${orgId}`,
            },
            upcomingEvents: {
                name: 'Upcoming events',
                url: `/o/${orgId}/events-upcoming`,
            },
            icals: {
                name: 'iCal list',
                url: `/o/${orgId}/icals`,
            },
            reminders: {
                name: 'Reminders',
                url: `/o/${orgId}/reminders`,
            },
            settings: {
                name: 'Organization settings',
                url: `/o/${orgId}/settings`,
            },
        },
    },
})