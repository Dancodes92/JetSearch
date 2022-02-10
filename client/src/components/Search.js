import React, { useState } from 'react';
import axios from "axios";

function Search() {
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [Airport, setAirport] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(null);
  const [categories, setCategories] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");



  // have a button for search after a form that uses axios to make a post request to the server "api/search" with the form data
  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    const airport = Airport.toUpperCase();
    axios.post("/api/search", {
      username,
      password,
      airport,
      date,
      passengers,
      categories
    }).then(res => {
      setFlights(res.data);
      console.log("data", res.data);
      setIsLoading(false);
    }
    );
  };

  console.log("data", flights);
  // concat all the flights arrays into one array
  const allFlights = flights.reduce((acc, curr) => {
    return acc.concat(curr);
  }, []);

  console.log("allFlights", allFlights);


  // handle the change of the form inputs
  const handleChange = e => {
    const { name, value } = e.target;
    if (name === "Airport") {
      setAirport(value)
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
                value={Airport.toLocaleUpperCase()}
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
            <div className="form-group-checkbox">
              <label htmlFor="category">Aircraft Category</label>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="category"
                  name="Ultra Long Range"
                  onChange={handleCheckbox}
                  checked={categories.includes("Ultra Long Range")}
                />
                <label className="form-check-label" htmlFor="category">
                  Ultra Long Range
                </label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="category"
                  name="Heavy Jet"
                  onChange={handleCheckbox}
                  checked={categories.includes("Heavy Jet")}
                />
                <label className="form-check-label" htmlFor="category">
                  Heavy Jet
                </label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="category"
                  name="Super-Mid Jet"
                  onChange={handleCheckbox}
                  checked={categories.includes("Super-Mid Jet")}
                />
                <label className="form-check-label" htmlFor="category">
                  Super-Mid Jet
                </label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="category"
                  name="Mid Jet"
                  onChange={handleCheckbox}
                  checked={categories.includes("Mid Jet")}
                />
                <label className="form-check-label" htmlFor="category">
                  Mid Jet
                </label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="category"
                  name="Light Jet"
                  onChange={handleCheckbox}
                  checked={categories.includes("Light Jet")}
                />
                <label className="form-check-label" htmlFor="category">
                  Light Jet
                </label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="category"
                  name="Very Light Jet"
                  onChange={handleCheckbox}
                  checked={categories.includes("Very Light Jet")}
                />
                <label className="form-check-label" htmlFor="category">
                  Very Light Jet
                </label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="category"
                  name="Turboprop"
                  onChange={handleCheckbox}
                  checked={categories.includes("Turboprop")}
                />
                <label className="form-check-label" htmlFor="category">
                  Turboprop
                </label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="category"
                  name="Piston"
                  onChange={handleCheckbox}
                  checked={categories.includes("Piston")}
                />
                <label className="form-check-label" htmlFor="category">
                  Piston
                </label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="category"
                  name="VIP Airliner"
                  onChange={handleCheckbox}
                  checked={categories.includes("VIP Airliner")}
                />
                <label className="form-check-label" htmlFor="category">
                  VIP Airliner
                </label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="category"
                  name="Jet Airliner"
                  onChange={handleCheckbox}
                  checked={categories.includes("Jet Airliner")}
                />
                <label className="form-check-label" htmlFor="category">
                  Jet Airliner
                </label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="category"
                  name="Regional Jet Airliner"
                  onChange={handleCheckbox}
                  checked={categories.includes("Regional Jet Airliner")}
                />
                <label className="form-check-label" htmlFor="category">
                  Regional Jet Airliner
                </label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="category"
                  name="Turboprop Airliner"
                  onChange={handleCheckbox}
                  checked={categories.includes("Turboprop Airliner")}
                />
                <label className="form-check-label" htmlFor="category">
                  Turboprop Airliner
                </label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="category"
                  name="Piston Airliner"
                  onChange={handleCheckbox}
                  checked={categories.includes("Piston Airliner")}
                />
                <label className="form-check-label" htmlFor="category">
                  Piston Airliner
                </label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="category"
                  name="Helicopter - Twin"
                  onChange={handleCheckbox}
                  checked={categories.includes("Helicopter - Twin")}
                />
                <label className="form-check-label" htmlFor="category">
                  Helicopter - Twin
                </label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="category"
                  name="Helicopter - Single"
                  onChange={handleCheckbox}
                  checked={categories.includes("Helicopter - Single")}
                />
                <label className="form-check-label" htmlFor="category">
                  Helicopter - Single
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
              {allFlights?.map((flight, index) => (
                <li key={index}>
                  company: {flight.company}
                  <br />
                  jetType: {flight.jet}
                  <br />
                </li>
              ))}

            </ul>
          </div>
        )}
      </div>
    </div>
  );
}


export default Search;

