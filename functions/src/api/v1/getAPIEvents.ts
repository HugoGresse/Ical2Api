import { Request, Response } from 'express'
import { getEvents } from '../../dbGetters/getEvents'
import {
    getGrantedOrganizations,
    isOrganizationReadAccepted,
} from '../../security/getGrantedOrganizations'
import { Organization } from '../../types/Organization'
import { getIcal } from '../../dbGetters/getIcal'
import { Ical } from '../../types/Ical'
import { getOrganization } from '../../dbGetters/getOrganization'

export default async (req: Request, res: Response) => {
    const { icals, status, organizations, readToken } = req.query

    let grantedIcalsIds = undefined
    let grantedOrganizationIds = undefined

    if (icals) {
        const grantedIcals = await getGrantedIcals(icals.split(','))
        grantedIcalsIds = grantedIcals.map(ical => ical.id)
    }

    if (organizations) {
        const grantedOrganizations = await getGrantedOrganizations(
            organizations.split(','),
            readToken
        )
        grantedOrganizationIds = grantedOrganizations.map(org => org.id)
    }

    const events = await getEvents(
        grantedIcalsIds,
        grantedOrganizationIds,
        undefined,
        status
    )

    try {
        res.send(events)
    } catch (error) {
        console.error(error) // eslint-disable-line no-console
        res.status(500).end()
    }
}

const getIcals = async (icalIds: string[]): Promise<Ical[]> => {
    const icals: Ical[] = []
    for (const icalId of icalIds) {
        const ical = await getIcal(icalId)
        if (ical) {
            icals.push(ical)
        }
    }

    return icals
}

const getGrantedIcals = async (icalIds: string[]): Promise<Ical[]> => {
    const icals = await getIcals(icalIds)

    const grantedIcals = []
    for (const ical of icals) {
        const organization: Organization | undefined = await getOrganization(
            ical.organizationId
        )
        if (organization && (await isOrganizationReadAccepted(organization))) {
            grantedIcals.push(ical)
        }
    }

    return grantedIcals
}
