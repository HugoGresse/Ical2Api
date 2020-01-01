import {
  getReminders,
  Reminder,
  REMINDER_HOUR,
  REMINDER_WEEKLY
} from "./reminderUtils";
import { processWeeklyReminder } from "./processWeeklyReminder";

export const checkAndProcessReminders = async () => {
  console.log("> getRemindersToTrigger");
  const dbReminders = await getReminders();

  for (const reminder of dbReminders) {
    switch (reminder.type) {
      case REMINDER_WEEKLY:
        await processWeeklyReminder(reminder);
        break;
      case REMINDER_HOUR:
        await processDailyReminder(reminder);
        break;
      default:
        console.error(`Reminder type ${reminder.type} not managed`);
    }
  }
};

const processDailyReminder = (reminder: Reminder): Promise<number> => {
  return Promise.resolve(1);
};
