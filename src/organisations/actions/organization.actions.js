import { deleteField, firestore, serverTimestamp } from '../../utils/firebase'
import { updateOrganization } from './actions'

export const listenForOrganizationPrivateData = (dispatch, organizationId) => {
    dispatch({
        domain: 'org',
        type: 'privateDataLoading',
    })

    return firestore
        .collection('organizationsPrivateData')
        .doc(organizationId)
        .onSnapshot(snapshot => {
            dispatch({
                domain: 'org',
                type: 'privateDataLoaded',
                payload: snapshot.data(),
            })
        })
}

export const createDefaultOrganizationPrivateData = organizationId => {
    return firestore
        .collection('organizationsPrivateData')
        .doc(organizationId)
        .set({
            organizationId,
        })
}

export const updateOrganizationPrivateData = (
    dispatch,
    organizationId,
    formValues,
    user,
    originalOrganizationPrivateData
) => {
    const orgPrivateData = {
        organizationId,
    }

    if (formValues.public) {
        orgPrivateData.readToken = deleteField()
        orgPrivateData.writeToken = deleteField()
        if (originalOrganizationPrivateData.readToken) {
            orgPrivateData.readTokenChangeAt = serverTimestamp()
            orgPrivateData.readTokenChangeUser = `${user.displayName} (${user.email})`
        }
        if (originalOrganizationPrivateData.writeToken) {
            orgPrivateData.writeTokenChangeAt = serverTimestamp()
            orgPrivateData.writeTokenChangeUser = `${user.displayName} (${user.email})`
        }
    } else {
        orgPrivateData.readToken = formValues.readToken
        orgPrivateData.writeToken = formValues.writeToken

        if (originalOrganizationPrivateData) {
            if (
                originalOrganizationPrivateData.readToken !==
                formValues.readToken
            ) {
                orgPrivateData.readTokenChangeAt = serverTimestamp()
                orgPrivateData.readTokenChangeUser = `${user.displayName} (${user.email})`
            }
            if (
                originalOrganizationPrivateData.writeToken !==
                formValues.writeToken
            ) {
                orgPrivateData.writeTokenChangeAt = serverTimestamp()
                orgPrivateData.writeTokenChangeUser = `${user.displayName} (${user.email})`
            }
        }
    }

    return firestore
        .collection('organizationsPrivateData')
        .doc(organizationId)
        .set(orgPrivateData, { merge: true })
        .then(() => {
            const orgData = {
                id: organizationId,
                public: formValues.public,
                readToken: orgPrivateData.readToken,
                writeToken: orgPrivateData.writeToken,
            }
            return updateOrganization(orgData, dispatch)
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
