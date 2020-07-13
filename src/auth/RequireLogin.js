import { useStateValue } from '../state/state'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'

const RequireLogin = ({ children, displayLoginMessage = false }) => {
    const [
        {
            auth: { loggedIn },
        },
    ] = useStateValue()

    if (loggedIn) {
        return children
    }

    if (displayLoginMessage) {
        return (
            <>
                <Link component={RouterLink} to="/a/login">
                    Login
                </Link>{' '}
                to create organization & icals using Ical2Api
            </>
        )
    }

    return ''
}

export default RequireLogin
