import { useEffect, useState } from 'react'
import { authProvider } from '../utils/firebase'
import { useStateValue } from '../state/state'

const AuthListener = ({ children }) => {
    const [, dispatch] = useStateValue()
    const [, setLoggedIn] = useState(false)

    useEffect(() => {
        return authProvider.onAuthStateChanged((user) => {
            if (!user) {
                dispatch({
                    domain: 'auth',
                    type: 'logout',
                })

                return
            }
            setLoggedIn(!!user)
            dispatch({
                domain: 'auth',
                type: 'login',
                payload: {
                    user: {
                        ...user,
                        uid: user.uid || user._delegate.uid,
                        name: user.displayName || user.email,
                    },
                },
            })
        })
    }, [dispatch])

    return children
}

export default AuthListener
