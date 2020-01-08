import fetch from 'node-fetch'
import { Ical } from './geIcals'

export interface IcalFile {
    data: string
    ical: Ical
}

const getIcalFiles = async (icals: Ical[]): Promise<IcalFile[]> => {
    const icalFiles: IcalFile[] = []
    for (const ical of icals) {
        const data = await fetch(ical.url).then(res => res.text())

        icalFiles.push({
            data,
            ical,
        })
    }

    return icalFiles
}

export default getIcalFiles
