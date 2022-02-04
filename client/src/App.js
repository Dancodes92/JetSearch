import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [Airport, setAirport] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(null);
  const [categories, setCategories] = useState([]);

  // have a button for search after a form that uses axios to make a post request to the server "api/search" with the form data
  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    axios
      .post("/api/search/yo", {
        Airport,
        date,
        categories,
        passengers,
      })
      .then(res => {
        setFlights(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        setIsError(true);
        setIsLoading(false);
      });
  };

  // handle the change of the form inputs
  const handleChange = e => {
    const { name, value } = e.target;
    if (name === "Airport") {
      setAirport(value);
    } else if (name === "date") {
      setDate(value);
    } else if (name === "passengers") {
      setPassengers(value);
    }
  };

  const handleCheckbox = e => {
    const { name, checked } = e.target;
    if (checked) {
      setCategories(categories.concat(name));
    } else {
      setCategories(categories.filter(category => category !== name));
    }
  };

  console.log("categories", categories);

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="Airport">Airport</label>
              <input
                type="text"
                className="form-control"
                id="Airport"
                name="Airport"
                placeholder="Airport"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                placeholder="Date"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="passengers">Passengers</label>
              <input
                type="number"
                className="form-control"
                id="passengers"
                name="passengers"
                placeholder="Passengers"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="category"
                  name="economy"
                  onChange={handleCheckbox}
                  checked={categories.includes("economy")}
                />

                <label className="form-check-label" htmlFor="category">
                  Economy
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="category"
                  name="business"
                  onChange={handleCheckbox}
                  checked={categories.includes("business")}
                />
                <label className="form-check-label" htmlFor="category">
                  Business
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="category"
                  name="first"
                  onChange={handleCheckbox}
                  checked={categories.includes("first")}
                />
                <label className="form-check-label" htmlFor="category">
                  First
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </div>
      </header>
      <div className="container">
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Something went wrong...</div>
        ) : (
          <div>
            <h1>Results</h1>
            <ul>
              {flights.map(flight => (
                <li key={flight.id}>
                  {flight.airline} {flight.flight_number}{" "}
                  {flight.departure_airport} {flight.arrival_airport}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
