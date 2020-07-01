import React, { useEffect, useState } from 'react'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Typography from '@material-ui/core/Typography'
import { useLocation, Link } from 'react-router-dom'
import { useStateValue } from '../state/state'

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
            const orgName = organizations[id].name
            setBreadcrumbNameMap({
                '/o': 'My Organizations',
                [`/o/${id}`]: orgName,
                [`/o/${id}/icals`]: 'iCal list',
                [`/o/${id}/events`]: 'Events',
            })
        }
    }, [id, organizations])

    return (
        <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: 16 }}>
            {pathNames.map((value, index) => {
                const last = index === pathNames.length - 1
                const to = `/${pathNames.slice(0, index + 1).join('/')}`

                return last ? (
                    <Typography color="textPrimary" key={to}>
                        {breadcrumbNameMap[to]}
                    </Typography>
                ) : (
                    <Link color="inherit" to={to} key={to}>
                        {breadcrumbNameMap[to]}
                    </Link>
                )
            })}
        </Breadcrumbs>
    )
}

export default OrgBreadcrumb
