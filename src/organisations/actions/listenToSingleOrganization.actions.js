import { FirebaseErrorCode, firestore } from '../../utils/firebase'

export const listenToSingleOrganization = (
    dispatch,
    organizationId,
    user,
    token
) => {
    let query = firestore
        .collection('organizations')
        .where('organizationId', '==', organizationId)

    if (user) {
        query = query.where('members', 'array-contains', user.uid)
    }
    if (token) {
        query = query.where('readToken', '==', token)
    }

    return query.limit(1).onSnapshot(
        snapshots => {
            if (snapshots.empty) {
                return
            }
            const org = snapshots.docs[0]
            dispatch({
                domain: 'orgs',
                type: 'loaded',
                payload: {
                    [org.id]: {
                        id: org.id,
                        ...org.data(),
                    },
                },
            })
        },
        error => {
            switch (error.code) {
                case FirebaseErrorCode['permission-denied']:
                    dispatch({
                        domain: 'org',
                        type: 'loadError',
                        payload:
                            'No permission to read the organization. Do you need a token or should you log in?',
                    })
                    break

                default:
                    console.error(error)
                    dispatch({
                        domain: 'org',
                        type: 'loadError',
                        payload: `Error while loading the organization: ${error.message}`,
                    })
                    break
            }
        }
    )
}
