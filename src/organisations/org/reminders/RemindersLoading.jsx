import { useEffect } from 'react'
import { firestore } from '../../../utils/firebase'
import { useStateValue } from '../../../state/state'
import { listenForSlackInstalls } from '../../actions/slack.actions'

const RemindersLoading = ({ children }) => {
    const [
        {
            selectedOrganization: { id },
        },
        dispatch,
    ] = useStateValue()

    useEffect(() => {
        if (!id) {
            return
        }
        dispatch({
            domain: 'org',
            type: 'remindersLoading',
        })

        const remindersUnsubscribe = firestore
            .collection('reminders')
            .where('organizationId', '==', id)
            .orderBy('type')
            .onSnapshot(querySnapshot => {
                dispatch({
                    domain: 'org',
                    type: 'remindersLoaded',
                    payload: querySnapshot.docs.map(ref => ({
                        id: ref.id,
                        ...ref.data(),
                    })),
                })
            })
        return () => {
            remindersUnsubscribe()
        }
    }, [dispatch, id])

    useEffect(() => {
        return listenForSlackInstalls(id, dispatch)
    }, [dispatch, id])

    return children
}

export default RemindersLoading
