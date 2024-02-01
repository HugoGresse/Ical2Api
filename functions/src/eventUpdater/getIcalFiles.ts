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
            const response = await fetch(ical.url, {
                headers: {
                    Cookie: 'MEETUP_MEMBER=id=184681297; ',
                },
            })

            console.log(
                'response',
                response.status,
                response.statusText,
                response.ok
            )
            if (!response.ok) {
                throw new Error(
                    'Error fetching ical: ' +
                        response.status +
                        ' ' +
                        response.statusText
                )
            }

            const data = await response.text()

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
