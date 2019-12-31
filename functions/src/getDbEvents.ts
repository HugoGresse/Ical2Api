import { db } from "./utils/initFirebase";
import { Event } from "./eventUpdater/Event";

const getDbEvents = async (): Promise<Event[]> => {
  const eventsSnapshots = await db.collection("events").get();

  const events: Event[] = [];
  eventsSnapshots.forEach(snapshot => {
    events.push({
      id: snapshot.id,
      ...snapshot.data()
    } as Event);
  });

  return Promise.resolve(events);
};

export default getDbEvents;
