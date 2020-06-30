import React, { useEffect } from 'react'
import { authProvider } from '../utils/firebase'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useStateValue } from '../state/state'
import { useHistory } from 'react-router-dom'

const Logout = () => {
    const history = useHistory()
    const [
        {
            auth: { loggedIn },
        },
    ] = useStateValue()

    useEffect(() => {
        authProvider.signOut()
    }, [])

    useEffect(() => {
        if (!loggedIn) {
            history.push('/')
        }
    }, [loggedIn, history])

    return <CircularProgress />
}

export default Logout
