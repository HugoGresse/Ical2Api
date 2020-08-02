import * as functions from 'firebase-functions'
import { assertOrganizationAdmins } from '../security/assertOrganizationAdmins'
import { db } from '../utils/initFirebase'
import { Organization } from '../types/Organization'

export const deleteOrganization = functions
    .runWith({
        timeoutSeconds: 540,
        memory: '2GB',
    })
    .https.onCall(async (data, context) => {
        if (!data || !data.organizationId) {
            throw new functions.https.HttpsError(
                'failed-precondition',
                'Input parameters are empty'
            )
        }
        const orgId = data.organizationId

        await assertOrganizationAdmins(context, orgId)

        const organization = await db
            .collection('organizations')
            .doc(orgId)
            .get()
            .then(snapshot => {
                if (!snapshot.exists) {
                    throw new functions.https.HttpsError(
                        'failed-precondition',
                        'Org does not exist'
                    )
                }
                return snapshot.data() as Organization
            })

        organization.id = orgId

        console.warn(
            `User ${context.auth &&
                context.auth
                    .uid} has requested to delete organization ${orgId} ${
                organization.name
            } and was granted`
        )

        const icalsDeleted = await deleteIcals(organization)
        const eventsDeleted = await deleteEvents(organization)
        const remindersDeleted = await deleteReminders(organization)
        const orgPrivataDataDeleted = await deleteOrgPrivateData(organization)
        const orgDelete = await deleteOrg(organization)

        return {
            success:
                icalsDeleted &&
                eventsDeleted &&
                remindersDeleted &&
                orgPrivataDataDeleted &&
                orgDelete,
        }
    })

const deleteIcals = async (organization: Organization): Promise<boolean> => {
    const icalsSnapshotToDelete = await db
        .collection('icals')
        .where('organizationId', '==', organization.id)
        .get()

    const icalsDocs = icalsSnapshotToDelete.docs

    for (const icalDoc of icalsDocs) {
        await db
            .collection('icals')
            .doc(icalDoc.id)
            .delete()
            .then(() => true)
    }

    return true
}

const deleteEvents = async (organization: Organization): Promise<boolean> => {
    const eventsSnapshotToDelete = await db
        .collection('events')
        .where('organizationId', '==', organization.id)
        .get()

    const eventsDocs = eventsSnapshotToDelete.docs

    for (const eventDoc of eventsDocs) {
        console.log('delete e:' + eventDoc.id)

        await db
            .collection('events')
            .doc(eventDoc.id)
            .delete()
            .then(() => true)
    }

    return true
}

const deleteReminders = async (
    organization: Organization
): Promise<boolean> => {
    const remindersSnapshotToDelete = await db
        .collection('reminders')
        .where('organizationId', '==', organization.id)
        .get()

    const remindersDocs = remindersSnapshotToDelete.docs

    for (const reminder of remindersDocs) {
        console.log('delete r:' + reminder.id)

        await db
            .collection('reminders')
            .doc(reminder.id)
            .delete()
            .then(() => true)
    }

    return true
}

const deleteOrgPrivateData = async (
    organization: Organization
): Promise<boolean> => {
    const snapshotToDelete = await db
        .collection('organizationsPrivateData')
        .where('organizationId', '==', organization.id)
        .get()

    const orgDocs = snapshotToDelete.docs

    for (const org of orgDocs) {
        console.log('delete opd:' + org.id)

        await db
            .collection('organizationsPrivateData')
            .doc(org.id)
            .delete()
            .then(() => true)
    }

    return true
}

const deleteOrg = async (organization: Organization): Promise<boolean> => {
    return await db
        .collection('organizations')
        .doc(organization.id)
        .delete()
        .then(() => true)
}
