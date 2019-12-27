import { db, serverTimestamp } from "../initFirebase";
import { Event } from "./Event";

const updateEventInDb = async (events: Event[]): Promise<void> => {
  console.log(`> Adding ${events.length} events to the db`);

  for (const event of events) {
    await db
      .collection("events")
      .doc(generateIdFromEvent(event))
      .set({
        ...event,
        crawldAt: serverTimestamp()
      })
      .catch(error =>
        console.error(
          `Failed to update ${event.title} - ${event.id} meetupId: ${event.meetupId}`,
          error
        )
      );
  }

  console.log("> Updated completed!");

  return Promise.resolve();
};

const generateIdFromEvent = (e: Event): string => {
  return `${e.meetupId}+${e.id}`;
};

export default updateEventInDb;
