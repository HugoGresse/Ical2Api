import * as ICAL from 'ical.js'
import { IcalFile } from './getIcalFiles'
import { Event } from '../types/Event'
import { DateTime } from 'luxon'

const getUpcomingEvents = (icalFiles: IcalFile[]) => {
    const events: Event[] = []
    icalFiles.forEach(icalFile => {
        const jCal = ICAL.parse(icalFile.data)
        const comp = new ICAL.Component(jCal)
        const subComponents = comp.getAllSubcomponents('vevent')

        subComponents.forEach(vevent => {
            const event = new ICAL.Event(vevent)

            const startTime = getTimestampInCorrectUTCFromComponent(
                comp,
                vevent,
                'dtstart'
            )
            const endTime = getTimestampInCorrectUTCFromComponent(
                comp,
                vevent,
                'dtend'
            )
            events.push({
                organizationId: icalFile.ical.organizationId,
                url: vevent.getFirstPropertyValue('url'),
                startDate: startTime,
                endDate: endTime,
                durationInMinutes: Math.floor(
                    (endTime - startTime) / 1000 / 60
                ),
                description: event.description,
                title: event.summary,
                location: event.location,
                icalId: icalFile.ical.id,
                icalName: icalFile.ical.name,
                icalFileId: vevent.getFirstPropertyValue('uid'),
            })
        })
    })
    return events
}

// See bug https://github.com/mozilla-comm/ical.js/issues/102
const getTimestampInCorrectUTCFromComponent = (
    jCal: ICAL.Component,
    vevent: ICAL.Component,
    propertyName: string
): number => {
    const date = vevent.getFirstPropertyValue(propertyName)
    const vtimezone = jCal.getFirstSubcomponent('vtimezone')
    if (vtimezone) {
        //in microsoft, need to use timezone component, in gmail, no timezone, just UTC
        date.zone = new ICAL.Timezone(vtimezone)
    }
    return DateTime.fromJSDate(date.toJSDate())
        .toUTC(date.utcOffset() / 60)
        .toMillis()
}

export default getUpcomingEvents
