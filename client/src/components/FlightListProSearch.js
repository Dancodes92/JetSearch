import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

function Search() {
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [Airport, setAirport] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [passengers, setPassengers] = useState(null);
  const [categories, setCategories] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avinodeEmail, setAvinodeEmail] = useState("");
  const [flightListProEmail, setFlightListProEmail] = useState("");

  const navigate = useNavigate();

  // get the user credentials
  const getCredentials = async () => {
    const response = await axios.get("/auth/me", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    setAvinodeEmail(response.data.avinodeEmail);
    setFlightListProEmail(response.data.flightListProEmail);
  };

  useEffect(() => {
    getCredentials();
  }, []);

  // have a button for search after a form that uses axios to make a post request to the server "api/search" with the form data
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setIsError(false);
      const airport = Airport.toUpperCase();
      const res = await axios.post("/api/search", {
        username,
        password,
        airport,
        date,
        passengers,
        categories,
      });
      setAirport("");
      setDate("");
      setPassengers(null);
      setCategories([]);
      setFlights(res.data);
      console.log("data", res.data);
      setIsLoading(false);
      //navigate to the results page and pass the data as props
      navigate("/results", { state: { flights: res.data, airport: airport } });
    } catch (err) {
      setIsError(true);
      setIsLoading(false);
    }
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

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="search">
      <div className="search_container">
        <form onSubmit={handleSubmit} className="search_form">
          <div className="input_container">
            <div className="airport">
              <label htmlFor="Airport" className="input_label">Airport (ICAO)</label>
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
              <label htmlFor="date" className="input_label">Date</label>
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
              <label htmlFor="Time" className="input_label">Time</label>
              <input
                type="time"
                className="form-control"
                id="Time"
                name="Time"
                placeholder="Time"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="passengers" className="input_label">Passengers</label>
              <input
                type="number"
                className="form-control"
                id="passengers"
                name="passengers"
                placeholder="Passengers"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group-checkbox">
            <label htmlFor="category" className="category-title">Aircraft Category</label>

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
          {Airport && passengers && categories.length > 0 && (
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          )}
        </form>
      </div>
      <div className="container">
        {isError ? <div>Something went wrong...</div> : <div></div>}
      </div>
    </div>
  );
}

export default Search;
