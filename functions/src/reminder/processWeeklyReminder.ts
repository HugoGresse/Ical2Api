import { gatherEventsAndPostReminder, Reminder } from "./reminderUtils";
import { DateTime } from "luxon";

export const processWeeklyReminder = async (
  reminder: Reminder
): Promise<void> => {
  if (!reminder.weekday) {
    console.warn("Weekly reminder without weekday");
    return Promise.resolve();
  }

  const serverTimeInUtc = DateTime.local().toUTC();
  const reminderTime = DateTime.fromObject({
    weekday: reminder.weekday,
    hour: reminder.hours,
    zone: reminder.timezone
  });

  //  1. Is this the right time to launch the reminder?
  if (
    serverTimeInUtc.hasSame(reminderTime, "hour") &&
    serverTimeInUtc.hasSame(reminderTime, "day")
  ) {
    console.log("reminder match, checking events");
    const toDate = DateTime.fromObject({
      weekday: reminder.weekday,
      hour: reminder.hours,
      zone: reminder.timezone
    }).plus({ days: 7 });

    return gatherEventsAndPostReminder(reminder, reminderTime, toDate);
  }
  console.log(`Reminder ${reminder.id} not triggered`);
};
