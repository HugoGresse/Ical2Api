import * as functions from 'firebase-functions'
import { postCreatedEvent } from '../reminder/eventCreated'
import { Event } from '../eventUpdater/Event'

export const eventCreated = functions.firestore
    .document('/events/{eventId}')
    .onCreate(snapshot => {
        return postCreatedEvent({
            id: snapshot.id,
            ...snapshot.data(),
        } as Event)
    })
