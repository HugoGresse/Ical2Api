import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { CalendarCheck, CalendarClock } from "mdi-material-ui";
import Typography from "@material-ui/core/Typography";

const Event = ({ meetup, event }) => {
  return (
    <Grid item xs={12} component={Box} display="flex">
      <Box flex={1}>
        <Typography variant="h4">{event.title}</Typography>
        <Typography variant="h6">{meetup && meetup.name}</Typography>
        <Box>
          <Box>
            <CalendarClock
              style={{ top: 6, marginRight: 4, position: "relative" }}
            />
            {new Date(event.startDate).toISOString()}
          </Box>
          <Box>
            <CalendarCheck
              style={{ top: 6, marginRight: 4, position: "relative" }}
            />
            {event.location}
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default Event;
