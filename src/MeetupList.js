import React from "react";
import Meetup from "./Meetup";
import Grid from "@material-ui/core/Grid";

const MeetupList = () => {
  return (
    <Grid container spacing={4}>
      <Meetup />
      <Meetup />
      <Meetup />
      <Meetup />
      <Meetup />
      <Meetup />
      <Meetup />
    </Grid>
  );
};

export default MeetupList;
