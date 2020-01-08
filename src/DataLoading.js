import { useEffect } from 'react'
import { useStateValue } from './state/state'
import { firestore } from './utils/firestore'
import { useParams } from 'react-router-dom'

const DataLoading = ({ children }) => {
    // noinspection JSUnusedLocalSymbols
    const [state, dispatch] = useStateValue()
    let { organizationId } = useParams()

    useEffect(() => {
        firestore
            .collection('organizations')
            .doc(organizationId)
            .get()
            .then(doc => {
                if (!doc.exists) {
                    return
                }
                dispatch({
                    type: 'organizationLoaded',
                    payload: { id: doc.id, ...doc.data() },
                })
            })

        const icalsUnsubscribe = firestore
            .collection('icals')
            .where('organizationId', '==', organizationId)
            .onSnapshot(querySnapshot => {
                dispatch({
                    type: 'meetupsLoaded',
                    payload: querySnapshot.docs.map(ref => ({
                        id: ref.id,
                        ...ref.data(),
                    })),
                })
            })
        const eventsUnsubscribe = firestore
            .collection('events')
            .where('organizationId', '==', organizationId)
            .orderBy('startDate')
            .onSnapshot(querySnapshot => {
                dispatch({
                    type: 'eventsLoaded',
                    payload: querySnapshot.docs.map(ref => ({
                        id: ref.id,
                        ...ref.data(),
                    })),
                })
            })
        return () => {
            icalsUnsubscribe()
            eventsUnsubscribe()
        }
    }, [dispatch, organizationId])

    return children
}

export default DataLoading
