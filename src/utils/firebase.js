import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/performance'
import 'firebase/analytics'
import 'firebase/functions'

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}

const firebaseMain = firebase.initializeApp(config)

export const auth = firebase.auth
export const authProvider = firebaseMain.auth()
export const firestore = firebaseMain.firestore()
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp
export const nowTimestamp = firebase.firestore.Timestamp.now
export const deleteField = firebase.firestore.FieldValue.delete

// firebase.functions().useFunctionsEmulator('http://localhost:5000')
export const functions = {
    getUpcomingEventManually: firebase
        .functions()
        .httpsCallable('getUpcomingEventManually'),
    deleteOrganization: firebase
        .functions()
        .httpsCallable('deleteOrganization'),
}

authProvider.useDeviceLanguage()

if (
    process.env.NODE_ENV === 'production' &&
    process.env.REACT_APP_MEASUREMENT_ID
) {
    firebase.analytics()
}
