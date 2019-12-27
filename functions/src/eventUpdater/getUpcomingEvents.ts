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
      const startTime = event.startDate.toUnixTime();
      const endTime = event.endDate.toUnixTime();
      events.push({
        url: vevent.getFirstPropertyValue("url"),
        startDate: startTime,
        endDate: endTime,
        durationInMinutes: Math.floor((endTime - startTime) / 60),
        description: event.description,
        title: event.summary,
        location: event.location,
        meetupId: ical.meetup.id,
        id: vevent.getFirstPropertyValue("uid")
      });
    });
  });
  return events;
};

export default getUpcomingEvents;
