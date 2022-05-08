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

function AvinodeRoundTrip() {
  //from, to, date, time, pax, always select minimum cat
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [pax, setPax] = useState("1");
  const [date2, setDate2] = useState("");
  const [time2, setTime2] = useState("");
  const [categories, setCategories] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const canClick = [from, to, date, date2, time2, time, pax].every(
    item => item !== "" && item !== "none"
  );

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrMsg("");
      const response = await axios.post(
        "https://jetsearcher.herokuapp.com/api/searchAvinode",
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

  const handleDate2 = e => {
    // change the date format to mmddyy
    const dateArr = e.target.value.split("-");
    // change year to two digits
    const year = dateArr[0].slice(2);
    const newDate = `${dateArr[1]}${dateArr[2]}${year}`;
    setDate2(newDate);
  };

  useEffect(() => {
    // show snackbar if there is an error
    if (errMsg) {
      setTimeout(() => {
        setErrMsg("");
      }, 6000);
      setOpen(true);
    }
  }, [errMsg]);

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Box mt={3}>
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontFamily: "sans-serif",
            }}>
            Avinode
          </Typography>
          <Typography variant="body1" component="p" align="center">
            Round Trip
          </Typography>
        </Box>
        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="From"
                type="text"
                fullWidth
                value={from.toUpperCase()}
                onChange={e => setFrom(e.target.value.toUpperCase())}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="To"
                type="text"
                fullWidth
                value={to.toUpperCase()}
                onChange={e => setTo(e.target.value.toUpperCase())}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" component="p">
                Departure Date
              </Typography>
              <TextField type="date" fullWidth onChange={handleDate} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" component="p">
                Return Date
              </Typography>
              <TextField type="date" fullWidth onChange={handleDate2} />
            </Grid>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <TextField
                label="Number of Passengers"
                type="number"
                fullWidth
                value={pax}
                autoComplete="off"
                onChange={e => setPax(e.target.value > 0 ? e.target.value : 1)}
              />
            </Grid>
            <Grid item xs={12}>
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
                        checked={categories.includes("Piston")}
                        onChange={e => {
                          if (e.target.checked) {
                            setCategories([...categories, "Piston"]);
                          } else {
                            setCategories(
                              categories.filter(item => item !== "Piston")
                            );
                          }
                        }}
                        name="checkedC"
                        color="primary"
                      />
                    }
                    label="Piston"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={categories.includes("Turbo prop")}
                        onChange={e => {
                          if (e.target.checked) {
                            setCategories([...categories, "Turbo prop"]);
                          } else {
                            setCategories(
                              categories.filter(item => item !== "Turbo prop")
                            );
                          }
                        }}
                        name="checkedC"
                        color="primary"
                      />
                    }
                    label="Turbo prop"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={categories.includes("Entry level jet (VLJ)")}
                        onChange={e => {
                          if (e.target.checked) {
                            setCategories([
                              ...categories,
                              "Entry level jet (VLJ)",
                            ]);
                          } else {
                            setCategories(
                              categories.filter(
                                item => item !== "Entry level jet (VLJ)"
                              )
                            );
                          }
                        }}
                        name="checkedC"
                        color="primary"
                      />
                    }
                    label="Entry level jet (VLJ)"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={categories.includes("Light jet")}
                        onChange={e => {
                          if (e.target.checked) {
                            setCategories([...categories, "Light jet"]);
                          } else {
                            setCategories(
                              categories.filter(item => item !== "Light jet")
                            );
                          }
                        }}
                        name="checkedC"
                        color="primary"
                      />
                    }
                    label="Light jet"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={categories.includes("Super light jet")}
                        onChange={e => {
                          if (e.target.checked) {
                            setCategories([...categories, "Super light jet"]);
                          } else {
                            setCategories(
                              categories.filter(
                                item => item !== "Super light jet"
                              )
                            );
                          }
                        }}
                        name="checkedC"
                        color="primary"
                      />
                    }
                    label="Super light jet"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={categories.includes("Midsize jet")}
                        onChange={e => {
                          if (e.target.checked) {
                            setCategories([...categories, "Midsize jet"]);
                          } else {
                            setCategories(
                              categories.filter(item => item !== "Midsize jet")
                            );
                          }
                        }}
                        name="checkedC"
                        color="primary"
                      />
                    }
                    label="Midsize jet"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={categories.includes("Super midsize jet")}
                        onChange={e => {
                          if (e.target.checked) {
                            setCategories([...categories, "Super midsize jet"]);
                          } else {
                            setCategories(
                              categories.filter(
                                item => item !== "Super midsize jet"
                              )
                            );
                          }
                        }}
                        name="checkedC"
                        color="primary"
                      />
                    }
                    label="Super midsize jet"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={categories.includes("Heavy jet")}
                        onChange={e => {
                          if (e.target.checked) {
                            setCategories([...categories, "Heavy jet"]);
                          } else {
                            setCategories(
                              categories.filter(item => item !== "Heavy jet")
                            );
                          }
                        }}
                        name="checkedC"
                        color="primary"
                      />
                    }
                    label="Heavy jet"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={categories.includes("Ultra long range")}
                        onChange={e => {
                          if (e.target.checked) {
                            setCategories([...categories, "Ultra long range"]);
                          } else {
                            setCategories(
                              categories.filter(
                                item => item !== "Ultra long range"
                              )
                            );
                          }
                        }}
                        name="checkedC"
                        color="primary"
                      />
                    }
                    label="Ultra long range"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={categories.includes("VIP airliner")}
                        onChange={e => {
                          if (e.target.checked) {
                            setCategories([...categories, "VIP airliner"]);
                          } else {
                            setCategories(
                              categories.filter(item => item !== "VIP airliner")
                            );
                          }
                        }}
                        name="checkedC"
                        color="primary"
                      />
                    }
                    label="VIP airliner"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                disabled={!canClick || loading}
                fullWidth
                type="submit"
                sx={{
                  marginBottom: "1rem",
                }}>
                {loading ? <CircularProgress size={24} /> : "Search"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message={errMsg}
      />
    </Container>
  );
}

export default AvinodeRoundTrip;
