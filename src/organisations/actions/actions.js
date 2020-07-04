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
