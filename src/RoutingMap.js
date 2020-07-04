import { useParams } from 'react-router-dom'

export const RoutingMap = () => {
    const { organizationId } = useParams()

    return {
        orgs: {
            base: {
                name: 'Organizations',
                url: '/o',
            },
            org: {
                root: {
                    name: 'Upcoming events',
                    url: `/o/${organizationId}`,
                },
                icals: {
                    name: 'iCal list',
                    url: `/o/${organizationId}/icals`,
                },
            },
        },
    }
}
