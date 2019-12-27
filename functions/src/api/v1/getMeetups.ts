import { Request, Response } from "express";
import { db } from "../../initFirebase";
import * as admin from "firebase-admin";
import Query = admin.firestore.Query;

export default async (req: Request, res: Response) => {
  const query: Query = db.collection("icals");

  const result = await query.get();
  const events = result.docs.map(ref => ({ id: ref.id, ...ref.data() }));

  try {
    res.send(events);
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    res.status(500).end();
  }
};
