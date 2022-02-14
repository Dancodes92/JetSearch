import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Results() {
  const location = useLocation();
  console.log("location", location);


  //concat the arrays from the location.state.flights into one array
  let flightArray = [];
  for (let i = 0; i < location.state.flights.length; i++) {
    flightArray = flightArray.concat(location.state.flights[i]);
  }
  console.log("flightArray", flightArray);
  return (
    <div>
      <h1>Results</h1>
      <ul>
        {flightArray.map((result, i) => (
          <li key={i}>
            {result.company}
          </li>
        ))}
      </ul>
      <Link to="/">Search Again</Link>
    </div>
  );
}

export default Results;

