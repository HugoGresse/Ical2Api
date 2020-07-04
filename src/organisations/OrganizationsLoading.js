import { useEffect } from 'react'
import { firestore } from '../utils/firebase'
import { useStateValue } from '../state/state'

const OrganizationsLoading = ({ children, userId }) => {
    const [, dispatch] = useStateValue()

    useEffect(() => {
        const unsubscribe = firestore
            .collection('organizations')
            .where('members', 'array-contains', userId)
            .onSnapshot(querySnapshot => {
                dispatch({
                    domain: 'orgs',
                    type: 'loaded',
                    payload: querySnapshot.docs.reduce((acc, ref) => {
                        acc[ref.id] = {
                            id: ref.id,
                            ...ref.data(),
                        }
                        return acc
                    }, {}),
                })
            })
        return () => {
            unsubscribe()
        }
    }, [dispatch, userId])

    return children
}

export default OrganizationsLoading
