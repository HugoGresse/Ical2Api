import { FirebaseErrorCode, functions } from '../../utils/firebase'

export const getOrganizationEvent = (
    dispatch,
    organization = null,
    token = null
) => {
    if (!organization) {
        return () => {}
    }

    try {
        console.log('totot', token)
        functions
            .getCallableEvents({
                organizationId: organization.id,
                readToken: token,
            })
            .then(result => {
                if (result.error) {
                    if (
                        result.error === FirebaseErrorCode['permission-denied']
                    ) {
                        dispatch({
                            domain: 'org',
                            type: 'loadError',
                            payload:
                                'No permission to load some events. Do you need a token or should you log in?',
                        })
                    } else {
                        dispatch({
                            domain: 'org',
                            type: 'loadError',
                            payload: `Error while loading the events: ${result.error}`,
                        })
                    }
                } else {
                    dispatch({
                        domain: 'org',
                        type: 'eventsLoaded',
                        payload: result.data.events,
                    })
                }

                return () => {}
            })
    } catch (error) {
        console.log(error)
        dispatch({
            domain: 'org',
            type: 'loadError',
            payload: `Error while loading the events: ${error.message}`,
        })
    }
    return () => {}
}
