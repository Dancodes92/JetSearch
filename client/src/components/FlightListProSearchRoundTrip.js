import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import MuiAlert from "@mui/material/Alert";

function SearchRoundTrip() {
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [date2, setDate2] = useState("");
  const [time2, setTime2] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [categories, setCategories] = useState([]);
  const [radius, setRadius] = useState(0);
  const [open, setOpen] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  // have a button for search after a form that uses axios to make a post request to the server "api/search" with the form data
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setIsError(false);
      const airport = from.toUpperCase();
      const res = await axios.post(
        "https://jetsearcher.herokuapp.com/api/search",
        {
          airport,
          to,
          date,
          passengers,
          time,
          categories,
          date2,
          time2,
          radius,
        },
        {
          headers: { authorization: localStorage.getItem("token") },
        }
      );
      if (res.status === 200) {
        setFrom("");
        setTo("");
        setDate("");
        setPassengers(null);
        setTime("");
        setCategories([]);
        setFlights(res.data);
        setDate2("");
        setTime2("");
        console.log("data", res.data);
        setIsLoading(false);
        //navigate to the results page and pass the data as props
        navigate("/results", {
          state: { flights: res.data, airport: airport },
        });
      }
    } catch (err) {
      setIsError(true);
      setIsLoading(false);
      setErrMsg("Something went wrong, check the form and try again");
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

  const canClick = [from, to, date, passengers, time, categories, radius].every(
    item => item !== null
  );

  useEffect(() => {
    if (isError) {
      setOpen(true);
    }
  }, [isError]);

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          FlightListPro
        </Typography>
        <Typography
          variant="body1"
          component="p"
          style={{ marginBottom: "1rem" }}>
          Round Trip
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mt={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="from"
                  label="From (ICAO)"
                  type="text"
                  fullWidth
                  value={from.toUpperCase()}
                  onChange={e => setFrom(e.target.value.toUpperCase())}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="to"
                  label="To (ICAO)"
                  type="text"
                  fullWidth
                  value={to.toUpperCase()}
                  onChange={e => setTo(e.target.value.toUpperCase())}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" component="p">
                  Departure Date
                </Typography>
                <TextField
                  type="date"
                  fullWidth
                  onChange={e => setDate(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" component="p">
                  Return Date
                </Typography>
                <TextField
                  type="date"
                  fullWidth
                  onChange={e => setDate2(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" component="p">
                  Departure Time
                </Typography>
                <TextField
                  type="time"
                  fullWidth
                  value={time}
                  onChange={e => setTime(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" component="p">
                  Return Time
                </Typography>
                <TextField
                  type="time"
                  fullWidth
                  value={time2}
                  onChange={e => setTime2(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="Passengers"
                  label="Passengers"
                  type="number"
                  fullWidth
                  value={passengers}
                  onChange={e => setPassengers(e.target.value > 0 ? e.target.value : 1)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Radius</FormLabel>
                  <Select
                    label="Radius"
                    value={radius}
                    onChange={e => setRadius(e.target.value)}>
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                    <MenuItem value={150}>150</MenuItem>
                    <MenuItem value={200}>200</MenuItem>
                    <MenuItem value={250}>250</MenuItem>
                    <MenuItem value={300}>300</MenuItem>
                    <MenuItem value={350}>350</MenuItem>
                    <MenuItem value={400}>400</MenuItem>
                    <MenuItem value={450}>450</MenuItem>
                    <MenuItem value={500}>500</MenuItem>
                    <MenuItem value={1000}>1000</MenuItem>
                    <MenuItem value={2000}>2000</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Categories</FormLabel>
                  <FormGroup
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                    }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={categories.includes("Ultra Long Range")}
                          onChange={handleCheckbox}
                          name="Ultra Long Range"
                          color="primary"
                        />
                      }
                      label="Ultra Long Range"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={categories.includes("Heavy Jet")}
                          onChange={handleCheckbox}
                          name="Heavy Jet"
                          color="primary"
                        />
                      }
                      label="Heavy Jet"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={categories.includes("Super-Mid Jet")}
                          onChange={handleCheckbox}
                          name="Super-Mid Jet"
                          color="primary"
                        />
                      }
                      label="Super-Mid Jet"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={categories.includes("Mid Jet")}
                          onChange={handleCheckbox}
                          name="Mid Jet"
                          color="primary"
                        />
                      }
                      label="Mid Jet"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={categories.includes("Light Jet")}
                          onChange={handleCheckbox}
                          name="Light Jet"
                          color="primary"
                        />
                      }
                      label="Light Jet"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={categories.includes("Very Light Jet")}
                          onChange={handleCheckbox}
                          name="Very Light Jet"
                          color="primary"
                        />
                      }
                      label="Very Light Jet"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={categories.includes("Turboprop")}
                          onChange={handleCheckbox}
                          name="Turboprop"
                          color="primary"
                        />
                      }
                      label="Turboprop"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={categories.includes("Piston")}
                          onChange={handleCheckbox}
                          name="Piston"
                          color="primary"
                        />
                      }
                      label="Piston"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={categories.includes("VIP Airliner")}
                          onChange={handleCheckbox}
                          name="VIP Airliner"
                          color="primary"
                        />
                      }
                      label="VIP Airliner"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={categories.includes("Jet Airliner")}
                          onChange={handleCheckbox}
                          name="Jet Airliner"
                          color="primary"
                        />
                      }
                      label="Jet Airliner"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={categories.includes("Regional Jet Airliner")}
                          onChange={handleCheckbox}
                          name="Regional Jet Airliner"
                          color="primary"
                        />
                      }
                      label="Regional Jet Airliner"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={categories.includes("Turboprop Airliner")}
                          onChange={handleCheckbox}
                          name="Turboprop Airliner"
                          color="primary"
                        />
                      }
                      label="Turboprop Airliner"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={categories.includes("Piston Airliner")}
                          onChange={handleCheckbox}
                          name="Piston Airliner"
                          color="primary"
                        />
                      }
                      label="Piston Airliner"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={categories.includes("Helicopter - Twin")}
                          onChange={handleCheckbox}
                          name="Helicopter - Twin"
                          color="primary"
                        />
                      }
                      label="Helicopter - Twin"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={categories.includes("Helicopter - Single")}
                          onChange={handleCheckbox}
                          name="Helicopter - Single"
                          color="primary"
                        />
                      }
                      label="Helicopter - Single"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={!to || !from || !date || !categories.length || !time || isLoading}
                  >
                  {isLoading ? <CircularProgress size={24} /> : "Search"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
        <Snackbar
          open={open}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}>
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={() => setOpen(false)}
            severity="error"
            anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            {errMsg}
          </MuiAlert>
        </Snackbar>
      </Box>
    </Container>
  );
}

export default SearchRoundTrip;
