import { getReminders, REMINDER_HOUR, REMINDER_WEEKLY } from "./reminderUtils";
import { processWeeklyReminder } from "./processWeeklyReminder";
import { processHourlyReminder } from "./processHourlyReminder";

export const checkAndProcessReminders = async () => {
  console.log("> getRemindersToTrigger");
  const dbReminders = await getReminders();

  for (const reminder of dbReminders) {
    switch (reminder.type) {
      case REMINDER_WEEKLY:
        await processWeeklyReminder(reminder);
        break;
      case REMINDER_HOUR:
        await processHourlyReminder(reminder);
        break;
      default:
        console.error(`Reminder type ${reminder.type} not managed`);
    }
  }
};
