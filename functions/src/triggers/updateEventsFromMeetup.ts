import * as functions from 'firebase-functions'
import {updateDbFromMeetup} from '../eventUpdater'

export const scheduleUpdateEventFromMeetup = functions.pubsub.schedule('every 5 minutes').onRun(async(context) => {
    console.log('>> Run of scheduleUpdateEventFromMeetup started!')
    await updateDbFromMeetup()
    console.log('>> Run of scheduleUpdateEventFromMeetup ended!')
    return null
})
