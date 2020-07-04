import { db } from '../utils/initFirebase'

export interface Ical {
    id: string
    url: string
    name: string
    organizationId: string
}

const geIcals = async (): Promise<Ical[]> => {
    const icalsSnapshots = await db.collection('icals').get()

    const icals: Ical[] = []
    icalsSnapshots.forEach(snapshot => {
        icals.push({
            id: snapshot.id,
            ...snapshot.data(),
        } as Ical)
    })

    return Promise.resolve(icals)
}

export const getIcal = async (icalId: string): Promise<Ical> => {
    const icalDoc = await db
        .collection('icals')
        .doc(icalId)
        .get()
    return Promise.resolve({
        ...icalDoc.data(),
        id: icalDoc.id,
    } as Ical)
}

export default geIcals
