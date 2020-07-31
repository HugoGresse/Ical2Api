import * as functions from 'firebase-functions'
import { getGrantedOrganizations } from '../security/getGrantedOrganizations'
import { OrganizationId } from '../types/Organization'
import { getEvents, Status } from '../dbGetters/getEvents'

/**
 * Get events for a given organization, if it's public or token is accepted or is admin
 */
export const getCallableEvents = functions.https.onCall(
    async (data, context) => {
        if (!data || !data.organizationId) {
            throw new functions.https.HttpsError(
                'failed-precondition',
                'Input parameters are empty'
            )
        }

        const userId = context.auth?.uid
        const organizationId: OrganizationId = data.organizationId
        const status: Status = data.status
        const readToken = data.readToken

        const grantedOrganizations = await getGrantedOrganizations(
            [organizationId],
            readToken,
            userId
        )

        if (grantedOrganizations.length > 0) {
            const organization = grantedOrganizations[0]
            return await getEvents(
                undefined,
                undefined,
                organization.id,
                status
            )
        }

        return []
    }
)
