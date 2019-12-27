import * as express from "express";
import getEvents from "./getEvents";
import getMeetups from "./getMeetups";

// router
const router = express.Router();

// Events APIs
router.get("/events/", getEvents);
router.get("/meetups/", getMeetups);

export default router;
