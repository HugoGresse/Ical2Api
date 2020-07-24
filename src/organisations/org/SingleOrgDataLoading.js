import { useEffect } from 'react'
import { useStateValue, useUser } from '../../state/state'
import { firestore } from '../../utils/firebase'
import { useParams } from 'react-router-dom'
import { listenToEvents } from '../actions/events.actions'
import { listenToSingleOrganization } from '../actions/organizations.actions'

const SingleOrgDataLoading = ({ children, token }) => {
    const [{ organizations }, dispatch] = useStateValue()
    const { organizationId } = useParams()

    const [loggedIn, user] = useUser()
    const organization = organizations && organizations[organizationId]

    useEffect(() => {
        dispatch({
            domain: 'org',
            type: 'icalLoading',
        })

        const orgUnsubscribe = listenToSingleOrganization(
            dispatch,
            organizationId,
            user,
            token
        )

        let icalsUnsubscribe = () => {}
        if (loggedIn) {
            icalsUnsubscribe = firestore
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
        }

        return () => {
            orgUnsubscribe()
            icalsUnsubscribe()
        }
    }, [dispatch, organizationId, token, user, loggedIn])

    useEffect(() => {
        if (!organization) {
            return
        }

        dispatch({
            domain: 'org',
            type: 'eventsLoading',
        })

        // TODO : reuse token when changing token page
        const eventsUnsubscribe = listenToEvents(dispatch, organization, token)

        return () => {
            eventsUnsubscribe()
        }
    }, [dispatch, organization, token])

    return children
}

export default SingleOrgDataLoading
