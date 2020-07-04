import * as functions from 'firebase-functions'
import { CallableContext } from 'firebase-functions/lib/providers/https'
import { db } from './initFirebase'

export const assertOrganizationAdmins = async (
    context: CallableContext,
    organizationId: string
) => {
    if (!(context.auth && context.auth.token)) {
        throw new functions.https.HttpsError(
            'unauthenticated',
            'User not authentificated.'
        )
    }

    if (!organizationId || organizationId.length <= 0) {
        throw new functions.https.HttpsError(
            'invalid-argument',
            'Missing required parameters.'
        )
    }

    const organizationDoc = await db
        .collection('organizations')
        .doc(organizationId)
        .get()

    if (!organizationDoc.exists) {
        throw new functions.https.HttpsError(
            'not-found',
            'Organization has not been found.'
        )
    }

    const organization = organizationDoc.data()

    if (!organization) {
        throw new functions.https.HttpsError(
            'not-found',
            'Organization has not been found or is empty.'
        )
    }

    if (
        organization.owner !== context.auth.uid &&
        !organization.members.includes(context.auth.uid)
    ) {
        throw new functions.https.HttpsError(
            'permission-denied',
            'Only the organization members & owner can edit a organization.'
        )
    }
}
