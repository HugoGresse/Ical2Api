import { DateTime } from "luxon";
import {
  getEventsBetween,
  getReminders,
  Organization,
  Reminder,
  REMINDER_HOUR,
  REMINDER_WEEKLY
} from "./reminderUtils";
import { Event } from "../eventUpdater/Event";
import { db } from "../initFirebase";

export const getRemindersToTrigger = async () => {
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

const processWeeklyReminder = async (reminder: Reminder): Promise<void> => {
  if (!reminder.weekday) {
    console.warn("Weekly reminder without weekday");
    return Promise.resolve();
  }

  const serverTimeInUtc = DateTime.local().toUTC();
  const reminderTimeInUtc = DateTime.fromObject({
    weekday: reminder.weekday,
    hour: reminder.hours,
    zone: reminder.timezone
  });

  //  1. Is this the right time to launch the reminder?
  if (
    serverTimeInUtc.hasSame(reminderTimeInUtc, "hour") &&
    serverTimeInUtc.hasSame(reminderTimeInUtc, "day")
  ) {
    console.log("reminder match, checking events");
    const toDate = DateTime.fromObject({
      weekday: reminder.weekday,
      hour: reminder.hours,
      zone: reminder.timezone
    }).plus({ days: 7 });

    console.log(reminderTimeInUtc.toMillis(), toDate.toMillis());
    const events = await getEventsBetween(
      reminder.organizationId,
      reminderTimeInUtc,
      toDate
    );
    events.forEach(e => console.log(`- ${e.id} - ${e.title}`));
    console.log(`events get? ${events.length}`);

    if (events.length <= 0) {
      return Promise.resolve();
    }

    const organization = await getOrganization(reminder.organizationId);
    if (organization) {
      return postReminder(events, organization.slackWebHook);
    }
  }
  console.log(`Reminder ${reminder.id} not triggered`);

  // Call slack api
};

const processDailyReminder = (reminder: Reminder): Promise<number> => {
  return Promise.resolve(1);
};

export const getOrganization = async (
  orgId: string
): Promise<Organization | undefined> => {
  const doc = await db
    .collection("reminders")
    .doc(orgId)
    .get();

  if (doc.exists) {
    return {
      id: doc.id,
      ...doc.data()
    } as any;
  }
  return undefined;
};
export const postReminder = async (
  events: Event[],
  slackWebHookUrl: string
): Promise<void> => {
  if (!slackWebHookUrl) {
    return Promise.reject("Slack webhook url is not configured");
  }

  const attachments = events.map(event => {
    const formatedDate = DateTime.fromMillis(event.startDate)
      .setLocale("fr")
      .toLocaleString(DateTime.DATETIME_MED);
    return {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${event.title}*\ndu ${event.meetupId}.\n:clock1: ${formatedDate}\n:pushpin: ${event.location}\n${event.description}`
      },
      accessory: {
        type: "button",
        text: {
          type: "plain_text",
          text: "Voir sur TODO",
          emoji: true
        },
        url: event.url
      }
    };
  });

  const slackContent = {
    text: `Il y a *${events.length}* évènement(s) cette semaine:`,
    attachments: attachments
  };

  const postPromise = fetch(slackWebHookUrl, {
    method: "POST",
    body: JSON.stringify(slackContent),
    headers: {
      "Content-Type": "application/json"
    }
  });

  return postPromise
    .then(res => {
      if (res.status > 399) console.log(res);
    })
    .catch(error =>
      console.error(`Error occured during Slack event: ${error}`)
    );
};
