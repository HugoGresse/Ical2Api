import * as functions from "firebase-functions";
import { checkAndProcessReminders } from "../reminder/checkAndProcessReminders";

export const cronReminders = functions.pubsub
  // hour : 0 * * * *
  .schedule("*/5 * * * *")
  .onRun(async context => {
    await checkAndProcessReminders();
    return null;
  });
