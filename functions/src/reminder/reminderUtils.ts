import { db } from "../initFirebase";
import { DateTime } from "luxon";
import { Event } from "../eventUpdater/Event";

export const REMINDER_HOUR: "hour" = "hour";
export const REMINDER_WEEKLY: "weekly" = "weekly";

export type ReminderType = typeof REMINDER_HOUR | typeof REMINDER_WEEKLY;

export interface Reminder {
  id: string;
  organizationId: string;
  type: ReminderType;
  timezone: string;
  weekday?: number;
  hours?: number;
}

export interface Organization {
  id: string;
  name: string;
  slackWebHook: string;
}

export const getReminders = async (): Promise<Reminder[]> => {
  const snapshots = await db.collection("reminders").get();

  return Promise.resolve(
    snapshots.docs.map(ref => ({ id: ref.id, ...ref.data() } as Reminder))
  );
};

export const getEventsBetween = async (
  organizationId: string,
  fromDate: DateTime,
  toDate: DateTime
): Promise<Event[]> => {
  const eventsSnapshot = await db
    .collection("events")
    .where("organizationId", "==", organizationId)
    .where("startDate", ">=", fromDate.toMillis())
    .where("startDate", "<", toDate.toMillis())
    .orderBy("startDate", "asc")
    .get();

  return eventsSnapshot.docs.map(
    ref => ({ id: ref.id, ...ref.data() } as Event)
  );
};
