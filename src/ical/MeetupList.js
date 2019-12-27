import React from "react";
import Meetup from "./Meetup";
import Grid from "@material-ui/core/Grid";
import { useStateValue } from "../state/state";

const MeetupList = () => {
  const [{ meetups, events }] = useStateValue();

  return (
    <Grid container spacing={4}>
      {meetups.map(meetup => (
        <Meetup
          key={meetup.id}
          meetup={meetup}
          events={events.filter(event => event.meetupId === meetup.id)}
        />
      ))}
    </Grid>
  );
};

export default MeetupList;
