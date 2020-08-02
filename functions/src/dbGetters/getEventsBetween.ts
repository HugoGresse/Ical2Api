import { DateTime } from 'luxon'
import { Event } from '../types/Event'
import { db } from '../utils/initFirebase'

export const getEventsBetween = async (
    organizationId: string,
    fromDate: DateTime,
    toDate: DateTime
): Promise<Event[]> => {
    const eventsSnapshot = await db
        .collection('events')
        .where('organizationId', '==', organizationId)
        .where('startDate', '>=', fromDate.toMillis())
        .where('startDate', '<', toDate.toMillis())
        .orderBy('startDate', 'asc')
        .get()

    return eventsSnapshot.docs.map(
        ref => ({ id: ref.id, ...ref.data() } as Event)
    )
}
