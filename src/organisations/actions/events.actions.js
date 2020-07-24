import { firestore } from '../../utils/firebase'

export const listenToEvents = (dispatch, organization = null, token = null) => {
    if (!organization) {
        return () => {}
    }

    let query = firestore
        .collection('events')
        .where('organizationId', '==', organization.organizationId)

    if (!organization.public && token) {
        query = query.where('readToken', '==', token)
    }

    return query.orderBy('startDate').onSnapshot(querySnapshot => {
        dispatch({
            domain: 'org',
            type: 'eventsLoaded',
            payload: querySnapshot.docs.map(ref => ({
                id: ref.id,
                ...ref.data(),
            })),
        })
    })
}
