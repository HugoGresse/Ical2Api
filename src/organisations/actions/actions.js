import { firestore } from '../../utils/firebase'

export const newOrganization = (org, dispatch) => {
    return firestore
        .collection('organizations')
        .add(org)
        .then(({ id }) => {
            // No need to dispatch, new org are already listening lived
            return id
        })
        .catch(error => {
            dispatch({
                domain: 'error',
                type: 'new',
                payload: error,
            })
            return Promise.resolve()
        })
}

export const updateOrganization = (org, dispatch) => {
    return firestore
        .collection('organizations')
        .doc(org.id)
        .update(org)
        .catch(error => {
            dispatch({
                domain: 'error',
                type: 'new',
                payload: error,
            })
            return Promise.resolve()
        })
}

export const newIcal = (ical, dispatch) => {
    return firestore
        .collection('icals')
        .add(ical)
        .then(({ id }) => {
            // No need to dispatch, new org are already listening lived
            return id
        })
        .catch(error => {
            dispatch({
                domain: 'error',
                type: 'new',
                payload: error,
            })
            return Promise.resolve()
        })
}

export const editIcal = (ical, dispatch) => {
    return firestore
        .collection('icals')
        .doc(ical.id)
        .set(ical)
        .catch(error => {
            dispatch({
                domain: 'error',
                type: 'new',
                payload: error,
            })
            return Promise.resolve()
        })
}

export const newReminder = (reminder, dispatch) => {
    return firestore
        .collection('reminders')
        .add(reminder)
        .then(({ id }) => {
            // No need to dispatch, reminders are already listening live
            return id
        })
        .catch(error => {
            dispatch({
                domain: 'error',
                type: 'new',
                payload: error,
            })
            return Promise.resolve()
        })
}

export const editReminder = (reminder, dispatch) => {
    return firestore
        .collection('reminders')
        .doc(reminder.id)
        .set(reminder)
        .catch(error => {
            dispatch({
                domain: 'error',
                type: 'new',
                payload: error,
            })
            return Promise.resolve()
        })
}

export const deleteReminder = (reminder, dispatch) => {
    return firestore
        .collection('reminders')
        .doc(reminder.id)
        .delete()
        .catch(error => {
            dispatch({
                domain: 'error',
                type: 'new',
                payload: error,
            })
            return Promise.resolve()
        })
}
