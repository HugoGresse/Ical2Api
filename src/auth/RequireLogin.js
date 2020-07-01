import { useStateValue } from '../state/state'

const RequireLogin = ({ children }) => {
    const [
        {
            auth: { loggedIn },
        },
    ] = useStateValue()

    if (loggedIn) {
        return children
    }

    return 'Need login'
}

export default RequireLogin
