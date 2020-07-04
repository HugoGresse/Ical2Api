import * as functions from 'firebase-functions'
import { getIcal, Ical } from '../eventUpdater/geIcals'
import getIcalFiles from '../eventUpdater/getIcalFiles'
import getUpcomingEvents from '../eventUpdater/getUpcomingEvents'
import { assertOrganizationAdmins } from '../utils/assertOrganizationAdmins'

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
        icals.push(await getIcal(data.icalId))
        const icalsDatas = await getIcalFiles(icals)
        return getUpcomingEvents(icalsDatas)
    }
)
