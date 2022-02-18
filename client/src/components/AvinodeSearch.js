import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./Spinner";

function AvinodeSearch() {
  //from, to, date, time, pax, always select minimum cat
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [pax, setPax] = useState("");
  const [cat, setCat] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setErrMsg("");
  }, [from, to, date, time, pax, cat]);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/avinode/search", {
        from,
        to,
        date,
        time,
        pax,
        cat,
      });
      if (response.data === "success") {
        navigate("results", { state: { flights: response.data } });
      } else {
        setErrMsg("there was an error");
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("network error");
      } else {
        setErrMsg(err.response.data.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="avinode-search">
      <h1>Avinode Search</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="from">From</label>
          <input
            type="text"
            className="form-control"
            id="from"
            placeholder="From"
            value={from}
            onChange={e => setFrom(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="to">To</label>
          <input
            type="text"
            className="form-control"
            id="to"
            placeholder="To"
            value={to}
            onChange={e => setTo(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            placeholder="Date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input
              type="time"
              className="form-control"
              id="time"
              placeholder="Time"
              value={time}
              onChange={e => setTime(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="pax">Pax</label>
          <input
            type="number"
            className="form-control"
            id="pax"
            placeholder="Pax"
            value={pax}
            onChange={e => setPax(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cat">Cat</label>
          <input
            type="checkbox"
            className="form-control"
            id="cat"
            placeholder="Cat"
            value={cat}
            onChange={e => setCat(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      {errMsg && <p>{errMsg}</p>}
      {loading && <Spinner />}
    </div>
  );
}

export default AvinodeSearch;
