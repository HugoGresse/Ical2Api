import geIcals from './geIcals'
import getIcalFiles from './getIcalFiles'
import getUpcomingEvents from './getUpcomingEvents'
import updateEventInDb from './updateEventsInDb'

export const updateDbFromMeetup = async () => {
    const meetups = await geIcals()
    const icals = await getIcalFiles(meetups)
    const upcomingEvents = await getUpcomingEvents(icals)
    return updateEventInDb(upcomingEvents)
}
