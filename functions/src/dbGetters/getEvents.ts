import { db } from '../utils/initFirebase'
import * as admin from 'firebase-admin'
import Query = admin.firestore.Query
import { Event } from '../types/Event'
import { OrganizationId } from '../types/Organization'
import { IcalId } from '../types/Ical'

export const STATUS_UPCOMING = 'upcoming'
export const STATUS_PASSED = 'passed'

export type Status = typeof STATUS_UPCOMING | typeof STATUS_PASSED

export const getEvents = async (
    icals?: IcalId[],
    organizations?: OrganizationId[],
    organizationId?: OrganizationId,
    status?: Status
): Promise<Event[]> => {
    const wantedIcals = icals && icals.length > 0 ? icals : undefined
    const wantedOrganizations =
        organizations && organizations.length > 0 ? organizations : undefined

    // We need at list one of the three field below
    if (!wantedIcals && !wantedOrganizations && !organizationId) {
        return []
    }

    let query: Query = db.collection('events')

    if (icals && icals.length > 0) {
        query = query.where('icalId', 'in', icals)
    }

    if (organizations && organizations.length > 0) {
        query = query.where('organizationId', 'in', organizations)
    } else if (organizationId) {
        query = query.where('organizationId', '==', organizationId)
    }

    if (status) {
        switch (status) {
            case 'upcoming':
                query = query.where('startDate', '>', Date.now())
                break
            case 'passed':
                query = query.where('startDate', '<', Date.now())
                break
            default:
                break
        }
    }

    const result = await query.get()
    return result.docs.map(ref => ({ id: ref.id, ...ref.data() } as Event))
}
