import getMeetups from './getMeetups'
import getIcals from './getIcals'
import getUpcomingEvents from './getUpcomingEvents'
import updateEventInDb from './updateEventsInDb'

export const updateDbFromMeetup = async () => {
    const meetups = await getMeetups()
    const icals = await getIcals(meetups)
    const upcomingEvents = await getUpcomingEvents(icals)
    return updateEventInDb(upcomingEvents, meetups)
}
