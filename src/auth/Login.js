import React, { useEffect } from 'react'
import { StyledFirebaseAuth } from 'react-firebaseui'
import firebase from 'firebase/app'
import { useStateValue } from '../state/state'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import Link from '@material-ui/core/Link'

const uiConfig = {
    signInFlow: 'redirect',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            // Use email link authentication and do not require password.
            // Note this setting affects new users only.
            // For pre-existing users, they will still be prompted to provide their
            // passwords on sign-in.
            signInMethod:
                firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
            // Allow the user the ability to complete sign-in cross device, including
            // the mobile apps specified in the ActionCodeSettings object below.
            forceSameDevice: false,
            // Used to define the optional firebase.auth.ActionCodeSettings if
            // additional state needs to be passed along request and whether to open
            // the link in a mobile app if it is installed.
            emailLinkSignIn: function() {
                return {
                    // Custom FDL domain.
                    dynamicLinkDomain: process.env.REACT_APP_LOGIN_EMAIL_FDL,
                    // Always true for email link sign-in.
                    handleCodeInApp: true,
                }
            },
        },
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

    const history = useHistory()

    useEffect(() => {
        if (loggedIn) {
            history.push('/')
        }
    }, [loggedIn, history])

    if (loggedIn) {
        return (
            <>
                You are already logged in. Do you want to{' '}
                <Link component={RouterLink} to="/a/logout">
                    log out
                </Link>
                ?
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
