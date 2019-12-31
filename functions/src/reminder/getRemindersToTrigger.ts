import { DateTime } from "luxon";
import fetch from "node-fetch";
import {
  getEventsBetween,
  getReminders,
  Organization,
  Reminder,
  REMINDER_HOUR,
  REMINDER_WEEKLY
} from "./reminderUtils";
import { Event } from "../eventUpdater/Event";
import { db } from "../utils/initFirebase";
import { extractHostname } from "../utils/extractHostname";

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

    const events = await getEventsBetween(
      reminder.organizationId,
      reminderTimeInUtc,
      toDate
    );
    console.log(`events count: ${events.length}`);
    events.forEach(e => console.log(`- ${e.id} - ${e.title}`));

    if (events.length <= 0) {
      return Promise.resolve();
    }

    const organization = await getOrganization(reminder.organizationId);
    if (organization) {
      return postReminder(events, organization.slackWebHook);
    }
  }
  console.log(`Reminder ${reminder.id} not triggered`);
};

const processDailyReminder = (reminder: Reminder): Promise<number> => {
  return Promise.resolve(1);
};

export const getOrganization = async (
  orgId: string
): Promise<Organization | undefined> => {
  const doc = await db
    .collection("organizations")
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

  const attachments: object[] = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `:wave: Il y a *${events.length}* évènement${
          events.length > 1 ? "s" : ""
        } cette semaine:`
      }
    }
  ];

  events.forEach(event => {
    const formatedDate = DateTime.fromMillis(event.startDate)
      .setLocale("fr")
      .toLocaleString(DateTime.DATETIME_MED);

    attachments.push({
      type: "divider"
    });

    attachments.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `- *${event.title}*\ndu meetup *${event.meetupName}*.\n`
      },
      accessory: {
        type: "button",
        text: {
          type: "plain_text",
          text: `Voir sur ${extractHostname(event.url)}`,
          emoji: true
        },
        url: event.url
      }
    });

    attachments.push({
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `*:clock1: Date*\n${formatedDate}`
        },
        {
          type: "mrkdwn",
          text: `*:pushpin: Lieu*\n${event.location ? event.location : "-"}`
        }
      ]
    });
  });

  const postPromise = fetch(slackWebHookUrl, {
    method: "POST",
    body: JSON.stringify({
      blocks: attachments
    }),
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
