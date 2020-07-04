import { useStateValue } from '../state/state'
import React from 'react'
import { Link } from 'react-router-dom'

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
                <Link to="/a/login">Login</Link> to create organization & icals
                using Ical2Api
            </>
        )
    }

    return 'Need login'
}

export default RequireLogin
