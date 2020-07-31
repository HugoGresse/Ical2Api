import { db } from '../utils/initFirebase'
import { Ical } from '../types/Ical'

const getAllIcals = async (): Promise<Ical[]> => {
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

export default getAllIcals
