import fetch from 'node-fetch'
import {Meetup} from './getMeetups'

export interface Ical {
    data: string;
    meetup: Meetup;
}

const getIcals = async (meetups: Meetup[]): Promise<Ical[]> => {
    const icals: Ical[] = []
    for(const meetup of meetups) {
        const data = await fetch(meetup.url)
            .then(res => res.text())

        icals.push({
            data,
            meetup
        })
    }

    return icals
}

export default getIcals
