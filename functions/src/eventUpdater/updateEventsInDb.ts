import { db, serverTimestamp } from '../utils/initFirebase'
import { Event } from './Event'

const updateEventInDb = async (events: Event[]): Promise<void> => {
    console.log(`> Adding ${events.length} events to the db`)

    for (const event of events) {
        await db
            .collection('events')
            .doc(generateIdFromEvent(event))
            .set({
                ...event,
                crawldAt: serverTimestamp(),
            })
            .catch(error =>
                console.error(
                    `Failed to update ${event.title} - ${event.icalName}(${event.icalId})`,
                    error
                )
            )
    }

    console.log('> Update completed!')

    return Promise.resolve()
}

const generateIdFromEvent = (e: Event): string => {
    return `${e.icalId}+${e.icalFileId}`
}

export default updateEventInDb
