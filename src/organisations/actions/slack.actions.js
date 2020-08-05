import { FirebaseErrorCode, firestore } from '../../utils/firebase'

export const listenForSlackInstalls = (organizationId, dispatch) => {
    if (!organizationId) {
        return
    }

    return firestore
        .collection('slackInstallations')
        .where('organizationId', '==', organizationId)
        .onSnapshot(
            snapshots => {
                dispatch({
                    domain: 'org',
                    type: 'slackInstallsLoaded',
                    payload: snapshots.docs.map((item, id) => ({
                        ...item.data(),
                        id: item.id,
                    })),
                })
            },
            error => {
                switch (error.code) {
                    case FirebaseErrorCode['permission-denied']:
                        dispatch({
                            domain: 'org',
                            type: 'loadError',
                            payload:
                                'No permission to to the available Slack channels.',
                        })
                        break

                    default:
                        console.error(error)
                        dispatch({
                            domain: 'org',
                            type: 'loadError',
                            payload: `Error while loading the Slack channel: ${error.message}`,
                        })
                        break
                }
            }
        )
}
