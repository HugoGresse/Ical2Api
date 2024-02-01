import React, { useEffect, useState } from 'react'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Typography from '@material-ui/core/Typography'
import { useLocation, Link as RouterLink } from 'react-router-dom'
import { useStateValue } from '../state/state'
import { RoutingMap } from '../UseRoutingMap'
import Link from '@material-ui/core/Link'

const OrgBreadcrumb = () => {
    const location = useLocation()
    const [breadcrumbNameMap, setBreadcrumbNameMap] = useState({
        '/o': 'My Organizations',
    })

    const [
        {
            selectedOrganization: { id },
            organizations,
        },
    ] = useStateValue()
    const pathNames = location.pathname.split('/').filter(x => x)

    useEffect(() => {
        if (id && organizations[id]) {
            const routing = RoutingMap(id)
            const orgName = organizations[id].name
            setBreadcrumbNameMap({
                [routing.orgs.base.url]: 'My Organizations',
                [routing.orgs.org.root.url]: orgName,
                [routing.orgs.org.icals.url]: routing.orgs.org.icals.name,
                [routing.orgs.org.upcomingEvents.url]:
                    routing.orgs.org.upcomingEvents.name,
                [routing.orgs.org.passedEvents.url]:
                    routing.orgs.org.passedEvents.name,
                [routing.orgs.org.reminders.url]:
                    routing.orgs.org.reminders.name,
                [routing.orgs.org.settings.url]: routing.orgs.org.settings.name,
            })
        }
    }, [id, organizations])

    return (
        <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: 16 }}>
            {pathNames.map((value, index) => {
                const last = index === pathNames.length - 1
                const to = `/${pathNames.slice(0, index + 1).join('/')}`
                const nameMap = breadcrumbNameMap[to]

                return last ? (
                    <Typography color="textPrimary" key={to}>
                        {nameMap}
                    </Typography>
                ) : (
                    nameMap && (
                        <Link component={RouterLink} to={to} key={to}>
                            {nameMap}
                        </Link>
                    )
                )
            })}
        </Breadcrumbs>
    )
}

export default OrgBreadcrumb
