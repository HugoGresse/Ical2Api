import { db } from '../utils/initFirebase'
import { OrganizationPrivateData } from '../types/Organization'

export const getOrganizationPrivateData = async (
    orgId: string
): Promise<OrganizationPrivateData | undefined> => {
    const privateOrgDoc = await db
        .collection('organizationsPrivateData')
        .doc(orgId)
        .get()

    if (privateOrgDoc.exists) {
        return privateOrgDoc.data() as OrganizationPrivateData
    }

    return undefined
}
