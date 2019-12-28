import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

const List = styled.ul`
  list-style: none;
  display: flex;
`;

const Header = () => {
  return (
    <Box display="flex" justifyContent="space-between">
      <Typography variant="h1" style={{ margin: "20px 0" }}>
        Meetup2Api
      </Typography>

      <Box alignSelf="center">
        <nav>
          <List>
            <li>
              <Button component={Link} to="/">
                Upcoming Events
              </Button>
            </li>
            <li>
              <Button component={Link} to="/icals">
                Icals
              </Button>
            </li>
          </List>
        </nav>
      </Box>
    </Box>
  );
};

export default Header;
