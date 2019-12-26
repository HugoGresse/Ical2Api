import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";

const Footer = () => {
  return (
    <Box display="flex" justifyContent="space-between" margin="20px 0">
      <Typography variant="h6">
        <Link
          href="https://github.com/HugoGresse/Meetup2Api"
          color="inherit"
          target="_blank"
        >
          Open Source Project on GitHub
        </Link>
      </Typography>
      <Box alignSelf="center">
        <Typography variant="h6">
          <Link href="https://github.com/HugoGresse/Meetup2Api" color="inherit">
            Made by Hugo Gresse
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
