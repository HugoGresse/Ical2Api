import React from 'react'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Link, useRouteMatch } from 'react-router-dom'
import { RoutingMap } from '../../RoutingMap'

const OrgMenu = () => {
    const routing = RoutingMap()
    const match = useRouteMatch(routing.orgs.org.icals.url)
    const [value, setValue] = React.useState(match ? 1 : 0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <Paper square style={{ marginBottom: 32 }}>
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}>
                <Tab
                    label={routing.orgs.org.root.name}
                    component={Link}
                    to={RoutingMap().orgs.org.root.url}
                />
                <Tab
                    component={Link}
                    label={routing.orgs.org.icals.name}
                    to={RoutingMap().orgs.org.icals.url}
                />
            </Tabs>
        </Paper>
    )
}

export default OrgMenu
