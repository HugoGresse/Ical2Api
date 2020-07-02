import React from 'react'
import { useStateValue } from '../state/state'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'

const Home = () => {
    const [
        {
            auth: { loggedIn },
        },
    ] = useStateValue()

    if (loggedIn) {
        return (
            <>
                <Button
                    to="/o"
                    component={RouterLink}
                    variant="outlined"
                    color="primary">
                    Manage organisations
                </Button>
            </>
        )
    }

    // TODO : some starts about fetched event today and # of orga
    return (
        <>
            <Link to="/a/login">Login</Link> to start using Ical2Api
        </>
    )
}

export default Home
