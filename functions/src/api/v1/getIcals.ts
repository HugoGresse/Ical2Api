import { Request, Response } from 'express'
import { db } from '../../utils/initFirebase'
import * as admin from 'firebase-admin'
import Query = admin.firestore.Query

export default async (req: Request, res: Response) => {
    const { organizationId } = req.query

    if (!organizationId || organizationId.length <= 0) {
        res.status(400)
            .send('invalid organizationId query parameter')
            .end()
        return
    }

    const query: Query = db
        .collection('icals')
        .where('organizationId', '==', organizationId)

    const result = await query.get()
    const events = result.docs.map(ref => ({ id: ref.id, ...ref.data() }))

    try {
        res.send(events)
    } catch (error) {
        console.error(error) // eslint-disable-line no-console
        res.status(500).end()
    }
}
