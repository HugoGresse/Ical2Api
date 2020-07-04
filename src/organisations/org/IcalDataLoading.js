import { useEffect } from 'react'
import { useStateValue } from '../../state/state'
import { firestore } from '../../utils/firebase'
import { useParams } from 'react-router-dom'

const IcalDataLoading = ({ children }) => {
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
        }
    }, [dispatch, organizationId])

    return children
}

export default IcalDataLoading
