import { firestore } from '../../utils/firebase'

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

    return query.limit(1).onSnapshot(snapshots => {
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
    })
}
