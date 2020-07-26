import { FirebaseErrorCode, firestore } from '../../utils/firebase'

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

    return query.orderBy('startDate').onSnapshot(
        querySnapshot => {
            dispatch({
                domain: 'org',
                type: 'eventsLoaded',
                payload: querySnapshot.docs.map(ref => ({
                    id: ref.id,
                    ...ref.data(),
                })),
            })
        },
        error => {
            switch (error.code) {
                case FirebaseErrorCode['permission-denied']:
                    dispatch({
                        domain: 'org',
                        type: 'loadError',
                        payload:
                            'No permission to load some events. Do you need a token or should you log in?',
                    })
                    break

                default:
                    console.error(error)
                    dispatch({
                        domain: 'org',
                        type: 'loadError',
                        payload: `Error while loading the events: ${error.message}`,
                    })
                    break
            }
        }
    )
}
