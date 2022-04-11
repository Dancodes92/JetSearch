import React from "react";
import { Link, useLocation } from "react-router-dom";
import { List, ListItem, ListItemText, Box, Typography, Button } from "@mui/material";

function Results() {
  const location = useLocation();
  console.log("location", location);

  // first flatten the array location.state.flights
  const flights = location.state.flights.reduce((acc, curr) => {
    return acc.concat(curr);
  }, []);

  // now filter out null values
  const filteredFlights = flights.filter(flight => flight !== null);

  console.log("filteredFlights", filteredFlights);
  // if filteredFlights.company exists, we need to alter the array to be an array of no objects `${filteredFlights.company}, ${filteredFlights.jet}`

  const flightsList = filteredFlights.map((flight, index) => {

    if(flight.company) {

    //  return `${flight.company}, ${flight.jet}`
    return (
      <ListItem key={index}>
        <ListItemText primary={`${flight.company}, ${flight.jet}`} />
      </ListItem>
    );
    } else {
      return (
        <ListItem key={index}>
          <ListItemText primary={`${flight}`} />
        </ListItem>
      );
    }
  });

  return (
    <Box>
      <Link to="/">
        <Button>Back</Button>
      </Link>
      <Typography variant="h4">Results</Typography>
      <Typography variant="h6">{filteredFlights.length} flights found</Typography>
      <List>
        {flightsList}
      </List>
    </Box>
  );
}

export default Results;
