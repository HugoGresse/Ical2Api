import { Organization, OrganizationId } from '../types/Organization'
import { ReadToken } from '../types/Token'
import { getOrganization } from '../dbGetters/getOrganization'
import { getOrganizationPrivateData } from '../dbGetters/getOrganizationPrivateData'
import { UserId } from '../types/UserId'
import { isUserAdmin } from './assertOrganizationAdmins'

export const getGrantedOrganizations = async (
    organizationIds: OrganizationId[],
    token?: ReadToken,
    userId?: UserId
): Promise<Organization[]> => {
    const grantedOrganizations: Organization[] = []

    for (const orgId of organizationIds) {
        const organization = await getOrganization(orgId)
        if (!organization) {
            continue
        }

        if (await isOrganizationReadAccepted(organization, token, userId)) {
            grantedOrganizations.push(organization)
        }
    }

    return grantedOrganizations
}

export const isOrganizationReadAccepted = async (
    organization: Organization,
    token?: ReadToken,
    userId?: UserId
): Promise<boolean> => {
    if (!organization) {
        return false
    }

    // 1. Public organization
    if (organization.public) {
        return true
    }

    // 2. Private organization, need privateData & token
    const organizationPrivateData = await getOrganizationPrivateData(
        organization.id
    )
    if (!organizationPrivateData) {
        return false
    }
    if (
        organizationPrivateData.readToken &&
        organizationPrivateData.readToken === token
    ) {
        return true
    }

    // 3. User is admin
    if (userId && userId.length > 0 && isUserAdmin(organization, userId)) {
        return true
    }

    return false
}
