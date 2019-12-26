import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {
  DatabaseRefresh,
  LeadPencil,
  CalendarCheck,
  CalendarClock
} from "mdi-material-ui";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

const Meetup = () => {
  return (
    <Grid item xs={12} sm={4} component={Box} display="flex">
      <Box flex={1}>
        <Typography variant="h6">Meetup1</Typography>
        <Box>
          <Box>
            <CalendarClock
              style={{ top: 6, marginRight: 4, position: "relative" }}
            />
            1 upcoming event
          </Box>
          <Box>
            <CalendarCheck
              style={{ top: 6, marginRight: 4, position: "relative" }}
            />
            3 passed events
          </Box>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column">
        <IconButton aria-label="refresh meetup events">
          <DatabaseRefresh />
        </IconButton>
        <IconButton aria-label="edit meetup">
          <LeadPencil />
        </IconButton>
      </Box>
    </Grid>
  );
};

export default Meetup;
