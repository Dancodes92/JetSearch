import React from "react";
import { Link, useLocation } from "react-router-dom";

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
    <section>
      <h1 className="results-title">Results</h1>
      <div className="results_list">
        {flightArray.map((result, i) => (
          <div key={i}>
            <div><span style={{ color:"dodgerblue" }}>{result.company}</span> {result.jet}</div>
          </div>
        ))}
      </div>
      <Link to="/">Search Again</Link>
      </section>
  );
}

export default Results;
