import React from 'react'
import { StyledFirebaseAuth } from 'react-firebaseui'
import firebase from 'firebase'
import { useStateValue } from '../state/state'
import { Link } from 'react-router-dom'

const uiConfig = {
    signInFlow: 'redirect',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        signInSuccessWithAuthResult: () => false,
    },
}

const Login = () => {
    const [
        {
            auth: { loggedIn },
        },
    ] = useStateValue()
    if (loggedIn) {
        return (
            <>
                You are already logged in. Do you want to{' '}
                <Link to="/a/logout">log out</Link>?
            </>
        )
    }

    return (
        <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
        />
    )
}

export default Login
