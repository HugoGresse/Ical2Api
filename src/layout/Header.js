import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import { CalendarPlus } from "mdi-material-ui";

const Header = () => {
  return (
    <Box display="flex" justifyContent="space-between">
      <Typography variant="h1" style={{ margin: "20px 0" }}>
        Meetup2Api
      </Typography>

      <Box alignSelf="center">
        <IconButton aria-label="index a new meetup">
          <CalendarPlus />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
