import { useParams } from 'react-router-dom'

export const useRoutingMap = () => {
    const { organizationId } = useParams()
    return RoutingMap(organizationId)
}

export const RoutingMap = (orgId) => ({
    orgs: {
        base: {
            name: 'Organizations',
            url: '/o',
        },
        org: {
            root: {
                name: 'Events',
                url: `/o/${orgId}`,
            },
            upcomingEvents: {
                name: 'Upcoming events',
                url: `/o/${orgId}/events-upcoming`,
            },
            passedEvents: {
                name: 'Passed events',
                url: `/o/${orgId}/events-passed`,
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
                name: 'Organization settings & APIs',
                url: `/o/${orgId}/settings`,
            },
        },
    },
})

export const getShareableEventUrl = (organization, organizationPrivateData) => {
    const baseUrl = `https://${import.meta.env.VITE_HOSTING_FDL}${
        RoutingMap(organization.id).orgs.org.upcomingEvents.url
    }`
    if (organization.public) {
        return baseUrl
    }
    return `${baseUrl}?token=${organizationPrivateData.readToken}`
}
