import { Organization } from '../reminder/reminderUtils'
import { db } from './initFirebase'

export const getOrganization = async (
    orgId: string
): Promise<Organization | undefined> => {
    const doc = await db
        .collection('organizations')
        .doc(orgId)
        .get()

    if (doc.exists) {
        return {
            id: doc.id,
            ...doc.data(),
        } as Organization
    }
    console.warn('Org not found')
    return undefined
}
