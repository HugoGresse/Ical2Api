import fetch from 'node-fetch'
import { Ical } from '../types/Ical'

export interface IcalFile {
    data: string
    ical: Ical
}

const getIcalFiles = async (icals: Ical[]): Promise<IcalFile[]> => {
    const icalFiles: IcalFile[] = []
    for (const ical of icals) {
        try {
            const data = await fetch(ical.url).then(res => res.text())

            icalFiles.push({
                data,
                ical,
            })
        } catch (error) {
            console.error(`Fetching ${ical.id} on ${ical.url} failed`, error)
        }
    }

    return icalFiles
}

export default getIcalFiles
