import { Request, Response } from "express";
import { db } from "../../utils/initFirebase";
import * as admin from "firebase-admin";
import Query = admin.firestore.Query;

export default async (req: Request, res: Response) => {
  const { meetups, status } = req.query;

  let query: Query = db.collection("events");

  if (meetups) {
    query = query.where("meetupId", "in", meetups.split(","));
  }

  if (status) {
    switch (status) {
      case "upcoming":
        query = query.where("startDate", ">", Date.now());
        break;
      case "passed":
        query = query.where("startDate", "<", Date.now());
        break;
      default:
        break;
    }
  }

  const result = await query.get();
  const events = result.docs.map(ref => ({ id: ref.id, ...ref.data() }));

  try {
    res.send(events);
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    res.status(500).end();
  }
};
