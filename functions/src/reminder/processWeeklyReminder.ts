import { getEventsBetween, Reminder } from "./reminderUtils";
import { DateTime } from "luxon";
import { getOrganization } from "../utils/dbGetters";
import { Event } from "../eventUpdater/Event";
import { extractHostname } from "../utils/extractHostname";
import { postMessageToSlack } from "./postMessageToSlack";

export const processWeeklyReminder = async (
  reminder: Reminder
): Promise<void> => {
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

const postReminder = async (
  events: Event[],
  slackWebHookUrl: string
): Promise<void> => {
  if (!slackWebHookUrl) {
    return Promise.reject("Slack webhook url is not configured");
  }

  const blocks: object[] = [
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
      .toLocaleString({
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
      });

    blocks.push({
      type: "divider"
    });

    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `:arrow_right: *${event.title}*\ndu meetup *${event.meetupName}*.\n`
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

    blocks.push({
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

  return postMessageToSlack(blocks, slackWebHookUrl);
};
