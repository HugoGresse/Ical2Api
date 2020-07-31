import { Reminder } from '../types/Reminder'
import { db } from '../utils/initFirebase'

export const getReminders = async (): Promise<Reminder[]> => {
    const snapshots = await db.collection('reminders').get()

    return Promise.resolve(
        snapshots.docs.map(ref => ({ id: ref.id, ...ref.data() } as Reminder))
    )
}
