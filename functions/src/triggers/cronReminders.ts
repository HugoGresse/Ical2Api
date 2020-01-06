import * as functions from "firebase-functions";
import { checkAndProcessReminders } from "../reminder/checkAndProcessReminders";

export const cronReminders = functions.pubsub
  .schedule("0 * * * *")
  .onRun(async context => {
    await checkAndProcessReminders();
    return null;
  });
