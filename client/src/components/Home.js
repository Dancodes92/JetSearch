import React from "react";
import { Link } from "react-router-dom";
import { Container, Paper, Typography, Stack, Button } from "@mui/material";

function Home() {
  // show button to got to "/flpSearch"

  // return Links to other pages
  return (
    <Container maxWidth="md">
      <Paper>
        <Stack spacing={3}>
          <Typography variant="h4">Welcome to Avinode</Typography>
          <Typography variant="body1">
            Avinode is a web application that helps you find the best flights
            to your destination.
          </Typography>
          </Stack>
          <Stack spacing={3}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/flpSearch"
            >
              Search Flights
            </Button>
            <Button
              variant="contained"
             
              component={Link}
              to="/avinodeSearch"
            >
              Search Avinode
            </Button>
          </Stack>
      </Paper>
    </Container>
  );
}
export default Home;
