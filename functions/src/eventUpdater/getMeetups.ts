import {db} from '../initFirebase'

export interface Meetup {
    id: string;
    url: string;
    name: string;
}

const getMeetups = async (): Promise<Meetup[]> => {
    const icalsSnapshots = await db.collection('icals').get()

    const icals: Meetup[] = []
    icalsSnapshots.forEach(snapshot => {
        icals.push({
            id: snapshot.id,
            ...snapshot.data()
        } as Meetup)
    })

    return Promise.resolve(icals)
}

export default getMeetups
