import { gatherEventsAndPostReminder, Reminder } from "./reminderUtils";
import { DateTime } from "luxon";

export const processHourlyReminder = async (
  reminder: Reminder
): Promise<void> => {
  if (!reminder.hours) {
    console.warn("Hourly reminder without hours");
    return Promise.resolve();
  }

  const reminderTime = DateTime.fromObject({
    minute: 0,
    zone: reminder.timezone
  }).plus({ minutes: reminder.hours * 60 });

  const reminderUpToDate = reminderTime.plus({ minutes: 59, seconds: 59 });

  console.log("Hourly reminder checking events: ");
  console.log("from", reminderTime.toISOTime(), reminderTime.toMillis());
  console.log("to", reminderUpToDate.toISOTime(), reminderUpToDate.toMillis());

  return gatherEventsAndPostReminder(reminder, reminderTime, reminderUpToDate);
};
