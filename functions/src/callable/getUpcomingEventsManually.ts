import * as functions from 'firebase-functions'
import getIcalFiles from '../eventUpdater/getIcalFiles'
import getUpcomingEvents from '../eventUpdater/getUpcomingEvents'
import { assertOrganizationAdmins } from '../security/assertOrganizationAdmins'
import { Ical } from '../types/Ical'
import { getIcal } from '../dbGetters/getIcal'

export const getUpcomingEventManually = functions.https.onCall(
    async (data, context) => {
        if (!data || !data.icalId || !data.organizationId) {
            throw new functions.https.HttpsError(
                'failed-precondition',
                'Input parameters are empty'
            )
        }

        await assertOrganizationAdmins(context, data.organizationId)

        const icals: Ical[] = []
        const ical = await getIcal(data.icalId)
        if (ical) {
            icals.push()
        }
        const icalsDatas = await getIcalFiles(icals)
        return getUpcomingEvents(icalsDatas)
    }
)
