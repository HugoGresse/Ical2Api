import * as ICAL from "ical.js";
import { Ical } from "./getIcals";
import { Event } from "./Event";
import { DateTime } from "luxon";

const getUpcomingEvents = (icals: Ical[]) => {
  const events: Event[] = [];
  icals.forEach(ical => {
    const jCal = ICAL.parse(ical.data);
    const comp = new ICAL.Component(jCal);
    const subComponents = comp.getAllSubcomponents("vevent");

    subComponents.forEach(vevent => {
      const event = new ICAL.Event(vevent);

      const startTime = getTimestampInCorrectUTCFromComponent(
        vevent,
        "dtstart"
      );
      const endTime = getTimestampInCorrectUTCFromComponent(vevent, "dtend");
      events.push({
        organizationId: ical.meetup.organizationId,
        url: vevent.getFirstPropertyValue("url"),
        startDate: startTime,
        endDate: endTime,
        durationInMinutes: Math.floor((endTime - startTime) / 1000 / 60),
        description: event.description,
        title: event.summary,
        location: event.location,
        meetupId: ical.meetup.id,
        meetupName: ical.meetup.name,
        icalId: vevent.getFirstPropertyValue("uid")
      });
    });
  });
  return events;
};

// See bug https://github.com/mozilla-comm/ical.js/issues/102
const getTimestampInCorrectUTCFromComponent = (
  vevent: ICAL.Component,
  propertyName: string
): number => {
  const date = vevent.getFirstPropertyValue(propertyName);
  const vtimezone = vevent.getFirstSubcomponent("vtimezone");
  if (vtimezone && DateTime.fromJSDate(date.toJSDate()).offset) {
    //in microsoft, need to use timezone component, in gmail, no timezone, just UTC
    date.zone = new ICAL.Timezone(vtimezone);
  }
  return DateTime.fromJSDate(date.toJSDate())
    .toUTC(date.utcOffset() / 60)
    .toMillis();
};

export default getUpcomingEvents;
