import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import { CalendarPlus } from "mdi-material-ui";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Box display="flex" justifyContent="space-between">
      <Typography variant="h1" style={{ margin: "20px 0" }}>
        Meetup2Api
      </Typography>

      <Box alignSelf="center">
        <nav>
          <ul>
            <li>
              <Link to="/">Upcoming Events</Link>
            </li>
            <li>
              <Link to="/icals">icals</Link>
            </li>
          </ul>
        </nav>

        <IconButton aria-label="index a new meetup">
          <CalendarPlus />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
