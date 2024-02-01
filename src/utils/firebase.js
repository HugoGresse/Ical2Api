import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/performance'
import 'firebase/compat/analytics'
import 'firebase/compat/functions'

const config = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_DATABASE_URL,
    projectId: import.meta.env.VITE_PROJECT_ID,
    appId: import.meta.env.VITE_APPID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
}

const firebaseMain = firebase.initializeApp(config)

export const auth = firebase.auth
export const authProvider = firebaseMain.auth()
export const firestore = firebaseMain.firestore()
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp
export const nowTimestamp = firebase.firestore.Timestamp.now
export const deleteField = firebase.firestore.FieldValue.delete

firebase.functions().useFunctionsEmulator('http://localhost:5000')
export const functions = {
    getUpcomingEventManually: firebase
        .functions()
        .httpsCallable('getUpcomingEventManually'),
    deleteOrganization: firebase
        .functions()
        .httpsCallable('deleteOrganization'),
    getCallableEvents: firebase.functions().httpsCallable('getCallableEvents'),
}

authProvider.useDeviceLanguage()

if (
    process.env.NODE_ENV === 'production' &&
    import.meta.env.VITE_MEASUREMENT_ID
) {
    firebase.analytics()
}

export const FirebaseErrorCode = {
    ok: 'ok',
    cancelled: 'cancelled',
    unknown: 'unknown',
    'invalid-argument': 'invalid-argument',
    'deadline-exceeded': 'deadline-exceeded',
    'not-found': 'not-found',
    'already-exists': 'already-exists',
    'permission-denied': 'permission-denied',
    'resource-exhausted': 'resource-exhausted',
    'failed-precondition': 'failed-precondition',
    aborted: 'aborted',
    'out-of-range': 'out-of-range',
    unimplemented: 'unimplemented',
    internal: 'internal',
    unavailable: 'unavailable',
    'data-loss': 'data-loss',
    unauthenticated: 'unauthenticated',
}
