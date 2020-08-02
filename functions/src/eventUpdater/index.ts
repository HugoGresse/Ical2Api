import getAllIcals from './getAllIcals'
import getIcalFiles from './getIcalFiles'
import getUpcomingEvents from './getUpcomingEvents'
import updateEventInDb from './updateEventsInDb'

export const updateDbFromMeetup = async () => {
    const meetups = await getAllIcals()
    const icals = await getIcalFiles(meetups)
    const upcomingEvents = await getUpcomingEvents(icals)
    return updateEventInDb(upcomingEvents)
}
