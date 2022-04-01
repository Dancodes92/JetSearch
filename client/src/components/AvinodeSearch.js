import React from "react";
import { Link, useNavigate, useMatch,
  useResolvedPath, } from "react-router-dom";
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
  const [date2, setDate2] = useState("");
  const [time2, setTime2] = useState("");
  const [categories, setCategories] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

const canClick = [from, to, date, time, pax].every(
    item => item !== ""
  );


  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrMsg("");
      const response = await axios.post(
        "api/searchAvinode",
        {
          from,
          to,
          date,
          time,
          date2,
          time2,
          pax,
          categories,
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("response", response);
      if (response.status === 200) {
        setLoading(false);
        navigate("/results", { state: { flights: response.data } });
      } else {
        setErrMsg("There was an error");
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("network error");
      } else {
        setErrMsg("ERROR PLEASE TRY AGAIN");
        setLoading(false);
      }
    }
  };

  const handleDate = e => {
    // change the date format to mmddyy
    const dateArr = e.target.value.split("-");
    // change year to two digits
    const year = dateArr[0].slice(2);
    const newDate = `${dateArr[1]}${dateArr[2]}${year}`;
    setDate(newDate);
  };

  if (loading) {
    return <Spinner />;
  }

  if (errMsg) {
    return (
      <section>
        <h2>{errMsg}</h2>
        <Link to="/">Search Again</Link>
      </section>
    );
  }

  return (
    <section>
      <div className="link-container">
        <Link to="/avroundtrip">
          <h5 className="roundtrip-btn">Go To Round Trip</h5>
        </Link>
      </div>
      <div className="avinode-search">
        <form onSubmit={handleSubmit}>
          <div className="text-inputs">
            <div className="form-group">
              <label htmlFor="from">From</label>
              <input
                type="text"
                className="form-control2"
                id="from"
                placeholder="From"
                value={from.toUpperCase()}
                onChange={e => setFrom(e.target.value.toUpperCase())}
              />
            </div>
            <div className="form-group">
              <label htmlFor="to">To</label>
              <input
                type="text"
                className="form-control2"
                id="to"
                placeholder="To"
                value={to.toLocaleUpperCase()}
                onChange={e => setTo(e.target.value.toUpperCase())}
              />
            </div>
              </div>
              <div className="text-inputs">
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                className="form-control3"
                id="date"
                placeholder="Date"
                onChange={handleDate}
              />
            </div>
            <div className="form-group">
              <label htmlFor="time">Time</label>
              <input
                type="time"
                className="form-control4"
                id="Time"
                placeholder="Time"
                value={time}
                onChange={e => setTime(e.target.value)}
              />
            </div>
          <div className="form-group">
            <label htmlFor="pax">Pax</label>
            <input
              type="number"
              className="form-control-pax"
              id="pax"
              placeholder="Pax"
              value={pax}
              onChange={e => setPax(e.target.value)}
              />
          </div>
              </div>
          <div className="form-group-checkbox">
            <div className="form-group">
              <h3 className="form-group-title">Categories</h3>
              <div className="form-group-checkbox-container">
                <div className="form-group-checkbox-item">
                  <input
                    type="checkbox"
                    id="Piston"
                    value="Piston"
                    onChange={e =>
                      setCategories(
                        e.target.checked
                          ? [...categories, e.target.value]
                          : categories.filter(cat => cat !== e.target.value)
                      )
                    }
                  />

                  <label htmlFor="Piston">
                    <span>
                      <i className="fas fa-plane-departure">Piston</i>
                    </span>
                  </label>
                </div>
                <div className="form-group-checkbox-item">
                  <input
                    type="checkbox"
                    id="Turbo prop"
                    value="Turbo prop"
                    onChange={e =>
                      setCategories(
                        e.target.checked
                          ? [...categories, e.target.value]
                          : categories.filter(cat => cat !== e.target.value)
                      )
                    }
                  />

                  <label htmlFor="Turbo prop">
                    <span>
                      <i className="fas fa-plane-departure">Turbo prop</i>
                    </span>
                  </label>
                </div>
                <div className="form-group-checkbox-item">
                  <input
                    type="checkbox"
                    id="Entry level jet (VLJ)"
                    value="Entry level jet (VLJ)"
                    onChange={e =>
                      setCategories(
                        e.target.checked
                          ? [...categories, e.target.value]
                          : categories.filter(cat => cat !== e.target.value)
                      )
                    }
                  />

                  <label htmlFor="Entry level jet (VLJ)">
                    <span>
                      <i className="fas fa-plane-departure">
                        Entry level jet (VLJ)
                      </i>
                    </span>
                  </label>
                </div>
                <div className="form-group-checkbox-item">
                  <input
                    type="checkbox"
                    id="Light jet"
                    value="Light jet"
                    onChange={e =>
                      setCategories(
                        e.target.checked
                          ? [...categories, e.target.value]
                          : categories.filter(cat => cat !== e.target.value)
                      )
                    }
                  />

                  <label htmlFor="Light jet">
                    <span>
                      <i className="fas fa-plane-departure">Light jet</i>
                    </span>
                  </label>
                </div>
                <div className="form-group-checkbox-item">
                  <input
                    type="checkbox"
                    id="Super light jet"
                    value="Super light jet"
                    onChange={e =>
                      setCategories(
                        e.target.checked
                          ? [...categories, e.target.value]
                          : categories.filter(cat => cat !== e.target.value)
                      )
                    }
                  />

                  <label htmlFor="Super light jet">
                    <span>
                      <i className="fas fa-plane-departure">Super light jet</i>
                    </span>
                  </label>
                </div>
                <div className="form-group-checkbox-item">
                  <input
                    type="checkbox"
                    id="Midsize jet"
                    value="Midsize jet"
                    onChange={e =>
                      setCategories(
                        e.target.checked
                          ? [...categories, e.target.value]
                          : categories.filter(cat => cat !== e.target.value)
                      )
                    }
                  />

                  <label htmlFor="Midsize jet">
                    <span>
                      <i className="fas fa-plane-departure">Midsize jet</i>
                    </span>
                  </label>
                </div>
                <div className="form-group-checkbox-item">
                  <input
                    type="checkbox"
                    id="Super midsize jet"
                    value="Super midsize jet"
                    onChange={e =>
                      setCategories(
                        e.target.checked
                          ? [...categories, e.target.value]
                          : categories.filter(cat => cat !== e.target.value)
                      )
                    }
                  />

                  <label htmlFor="Super midsize jet">
                    <span>
                      <i className="fas fa-plane-departure">
                        Super midsize jet
                      </i>
                    </span>
                  </label>
                </div>
                <div className="form-group-checkbox-item">
                  <input
                    type="checkbox"
                    id="Heavy jet"
                    value="Heavy jet"
                    onChange={e =>
                      setCategories(
                        e.target.checked
                          ? [...categories, e.target.value]
                          : categories.filter(cat => cat !== e.target.value)
                      )
                    }
                  />

                  <label htmlFor="Heavy jet">
                    <span>
                      <i className="fas fa-plane-departure">Heavy jet</i>
                    </span>
                  </label>
                </div>
                <div className="form-group-checkbox-item">
                  <input
                    type="checkbox"
                    id="Ultra long range"
                    value="Ultra long range"
                    onChange={e =>
                      setCategories(
                        e.target.checked
                          ? [...categories, e.target.value]
                          : categories.filter(cat => cat !== e.target.value)
                      )
                    }
                  />

                  <label htmlFor="Ultra long range">
                    <span>
                      <i className="fas fa-plane-departure">Ultra long range</i>
                    </span>
                  </label>
                </div>
                <div className="form-group-checkbox-item">
                  <input
                    type="checkbox"
                    id="VIP airliner"
                    value="VIP airliner"
                    onChange={e =>
                      setCategories(
                        e.target.checked
                          ? [...categories, e.target.value]
                          : categories.filter(cat => cat !== e.target.value)
                      )
                    }
                  />

                  <label htmlFor="VIP airliner">
                    <span>
                      <i className="fas fa-plane-departure">VIP airliner</i>
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {canClick && categories.length > 0 && (
            <button type="submit" className="btn btn-primary">
              Select Jets
            </button>
          )}
        </form>
      </div>
    </section>
  );
}

export default AvinodeSearch;
