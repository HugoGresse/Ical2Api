import { Ical, IcalId } from '../types/Ical'
import { db } from '../utils/initFirebase'

export const getIcal = async (icalId: IcalId): Promise<Ical | undefined> => {
    const doc = await db
        .collection('icals')
        .doc(icalId)
        .get()

    if (doc.exists) {
        return {
            id: doc.id,
            ...doc.data(),
        } as Ical
    }
    console.warn('Ical not found')
    return undefined
}
