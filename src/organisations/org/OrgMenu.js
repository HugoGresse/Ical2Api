import React, { useEffect } from 'react'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Link, useRouteMatch } from 'react-router-dom'
import { useRoutingMap } from '../../UseRoutingMap'
import { useStateValue } from '../../state/state'

const OrgMenu = () => {
    const [
        {
            auth: { loggedIn },
        },
    ] = useStateValue()
    const routing = useRoutingMap()
    const matchPassedEvents = useRouteMatch(routing.orgs.org.passedEvents.url)
    const matchIcals = useRouteMatch(routing.orgs.org.icals.url)
    const matchReminders = useRouteMatch(routing.orgs.org.reminders.url)
    const matchSettings = useRouteMatch(routing.orgs.org.settings.url)
    const [value, setValue] = React.useState(0)

    useEffect(() => {
        if (matchPassedEvents) {
            setValue(1)
        } else if (matchIcals) {
            setValue(2)
        } else if (matchReminders) {
            setValue(3)
        } else if (matchSettings) {
            setValue(4)
        } else {
            setValue(0)
        }
    }, [matchIcals, matchReminders, matchSettings])

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
                    component={Link}
                    label={routing.orgs.org.root.name}
                    to={useRoutingMap().orgs.org.root.url}
                />
                <Tab
                    component={Link}
                    label={routing.orgs.org.passedEvents.name}
                    to={useRoutingMap().orgs.org.passedEvents.url}
                />

                <Tab
                    component={Link}
                    label={routing.orgs.org.icals.name}
                    to={useRoutingMap().orgs.org.icals.url}
                    style={{ display: loggedIn ? 'inherit' : 'none' }}
                />
                <Tab
                    component={Link}
                    label={routing.orgs.org.reminders.name}
                    to={useRoutingMap().orgs.org.reminders.url}
                    style={{ display: loggedIn ? 'inherit' : 'none' }}
                />
                <Tab
                    component={Link}
                    label={routing.orgs.org.settings.name}
                    to={useRoutingMap().orgs.org.settings.url}
                    style={{ display: loggedIn ? 'inherit' : 'none' }}
                />
            </Tabs>
        </Paper>
    )
}

export default OrgMenu
