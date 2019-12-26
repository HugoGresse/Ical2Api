import {db, serverTimestamp} from '../initFirebase'
import {Event} from './Event'
import {Meetup} from './getMeetups'

const updateEventInDb = async (events:Event[], meetups: Meetup[]):Promise<void> => {
    console.log(`> Adding ${events.length} events to the db: `)
    events.forEach(event => {
        const meetup = meetups.filter(m => m.id === event.meetupId).pop()
        console.log(`- ${event.meetupId} - ${meetup?.name}: ${event.title} - ${event.date}`)
    })

    for(const event of events) {
        await db.collection('events')
            .doc(generateIdFromEvent(event))
            .set({
                ...event,
                crawldAt: serverTimestamp(),
            })
            .catch(error => console.error(`Failed to update ${event.title} - ${event.id} meetupId: ${event.meetupId}`, error))
    }

    console.log("> Updated completed!")

    return Promise.resolve()
}

const generateIdFromEvent = (e: Event): string => {
    return `${e.meetupId}+${e.id}`
}

export default updateEventInDb
