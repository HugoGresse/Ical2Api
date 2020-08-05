import React from 'react'
import Button from '@material-ui/core/Button'
import { Link as RouterLink } from 'react-router-dom'
import RequireLogin from '../auth/RequireLogin'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

const Home = () => {
    return (
        <>
            <RequireLogin displayLoginMessage={true}>
                <Button
                    to="/o"
                    component={RouterLink}
                    variant="outlined"
                    color="primary">
                    Manage organisations
                </Button>
            </RequireLogin>

            <br />
            <br />

            <Typography style={{ fontWeight: 600 }}>
                ical2api provide an ical aggregation services to a JSON API and
                Slack reminders (on event creation, weekly sumup and # of hours
                before).
            </Typography>
            <br />

            <Typography variant="h5">Features</Typography>
            <Typography>
                - aggregate one or many .iCal
                <br />
                - provide a .json API to query them
                <br />
                - provide a standalone upcoming events web page
                <br />
                - analytics for passed events
                <br />
                - Slack reminders
                <br />
            </Typography>
            <br />
            <Typography>
                It's{' '}
                <Link href="https://github.com/HugoGresse/Ical2Api/">
                    OPEN SOURCE
                </Link>{' '}
                and is using Firebase (Firestore, Functions, Analytics,
                Hosting).
            </Typography>
            <br />
            <Typography variant="h5">Security</Typography>
            <Typography>
                The Firestore database is protected by the Firestore security
                rules{' '}
                <Link href="https://github.com/HugoGresse/Ical2Api/blob/master/firestore.rules">
                    here
                </Link>
                . Events stored are either public by default or token protected
                (TODO) at your discretion to create/renew.
            </Typography>
        </>
    )
}

export default Home
