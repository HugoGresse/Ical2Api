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

        const eventsUnsubscribe = firestore
            .collection('events')
            .where('organizationId', '==', organizationId)
            .where('token', 'in', ['', 'azerty'])
            .orderBy('startDate')
            .onSnapshot(querySnapshot => {
                console.log(
                    'ok',
                    querySnapshot.docs.map(ref => ({
                        id: ref.id,
                        ...ref.data(),
                    }))
                )
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
            eventsUnsubscribe()
        }
    }, [dispatch, organizationId])

    return children
}

export default SingleOrgDataLoading
