import { firestore, functions, serverTimestamp } from '../../utils/firebase'

export const newOrganization = (org, dispatch) => {
    return firestore
        .collection('organizations')
        .add({
            ...org,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        })
        .then(async ({ id }) => {
            await firestore
                .collection('organizations')
                .doc(id)
                .update({
                    organizationId: id,
                })
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
        .update({
            ...org,
            updatedAt: serverTimestamp(),
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

export const deleteOrganization = (id, dispatch) => {
    try {
        return functions
            .deleteOrganization({
                organizationId: id,
            })
            .then(result => result.data.success)
    } catch (error) {
        dispatch({
            domain: 'error',
            type: 'new',
            payload: error,
        })
        return Promise.resolve()
    }
}

export const newIcal = (ical, dispatch) => {
    return firestore
        .collection('icals')
        .add({
            ...ical,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        })
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
        .set({
            ...ical,
            updatedAt: serverTimestamp(),
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

export const deleteIcal = (ical, dispatch) => {
    return firestore
        .collection('icals')
        .doc(ical.id)
        .delete()
        .then(() => true)
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
        .add({
            ...reminder,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        })
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
        .set({
            ...reminder,
            updatedAt: serverTimestamp(),
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

export const deleteReminder = (reminder, dispatch) => {
    return firestore
        .collection('reminders')
        .doc(reminder.id)
        .delete()
        .then(() => true)
        .catch(error => {
            dispatch({
                domain: 'error',
                type: 'new',
                payload: error,
            })
            return Promise.resolve()
        })
}
