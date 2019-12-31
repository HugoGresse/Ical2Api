import * as ICAL from "ical.js";
import { Ical } from "./getIcals";
import { Event } from "./Event";

const getUpcomingEvents = (icals: Ical[]) => {
  const events: Event[] = [];
  icals.forEach(ical => {
    const jCal = ICAL.parse(ical.data);
    const comp = new ICAL.Component(jCal);
    const subComponents = comp.getAllSubcomponents("vevent");

    subComponents.forEach(vevent => {
      const event = new ICAL.Event(vevent);
      const startTime = event.startDate.toUnixTime() * 1000;
      const endTime = event.endDate.toUnixTime() * 1000;
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

export default getUpcomingEvents;
