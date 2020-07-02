import { firestore } from '../../utils/firebase'

export const newOrganization = (org, dispatch) => {
    return firestore
        .collection('organizations')
        .add(org)
        .then(({ id }) => {
            dispatch({
                domain: 'orgs',
                type: 'created',
                payload: id,
            })
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
