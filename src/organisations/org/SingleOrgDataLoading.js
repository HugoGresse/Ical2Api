import { useEffect } from 'react'
import { useStateValue } from '../../state/state'
import { firestore } from '../../utils/firebase'
import { useParams } from 'react-router-dom'

const SingleOrgDataLoading = ({ children }) => {
    // noinspection JSUnusedLocalSymbols
    const [, dispatch] = useStateValue()
    const { organizationId } = useParams()

    useEffect(() => {
        dispatch({
            domain: 'org',
            type: 'icalLoading',
        })
        dispatch({
            domain: 'org',
            type: 'eventsLoading',
        })

        const orgUnsubscribe = firestore
            .collection('organizations')
            .doc(organizationId)
            .onSnapshot(snapshot => {
                dispatch({
                    domain: 'orgs',
                    type: 'loaded',
                    payload: {
                        [snapshot.id]: {
                            id: snapshot.id,
                            ...snapshot.data(),
                        },
                    },
                })
            })
        const icalsUnsubscribe = firestore
            .collection('icals')
            .where('organizationId', '==', organizationId)
            .onSnapshot(querySnapshot => {
                dispatch({
                    domain: 'org',
                    type: 'icalsLoaded',
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
                    domain: 'org',
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
            orgUnsubscribe()
        }
    }, [dispatch, organizationId])

    return children
}

export default SingleOrgDataLoading
