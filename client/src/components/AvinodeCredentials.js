import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function AvinodeCredentials({
  avinodeEmail,
  avinodePwd,
  setAvinodeEmail,
  setAvinodePwd,
  onNextStep,
  onPrevStep,
  step,
}) {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://jetsearcher.herokuapp.com/api/avinode", {
        email,
        password: pwd,
      });
      if (response.data === "logged in") {
        console.log("response", response.data);
        setAvinodeEmail(email);
        setAvinodePwd(pwd);
        setOpen(true);
        setErrMsg("Successfully logged in");
      } else {
        setErrMsg("Invalid Credentials");
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Network Error");
      } else {
        setErrMsg(err.response.data.message);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    // show snackbar if there is an error
    if (errMsg) {
      setTimeout(() => {
        setErrMsg("");
      }, 3000);
      setOpen(true);
    }
  }, [errMsg]);

  //if errMsg === "Successfully logged in" then show success message and call onNextStep
  if (errMsg === "Successfully logged in") {
    setTimeout(() => {
      setErrMsg("");
      onNextStep();
    }, 500);
  }

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Typography variant="h4" align="center">
          Avinode Credentials
        </Typography>
      </Box>
      <Box mt={2}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="username"
                type="text"
                fullWidth
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                label="Password"
                type="password"
                fullWidth
                value={pwd}
                onChange={e => setPwd(e.target.value)}
              />
            </Grid>
          </Grid>
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading || !email || !pwd || errMsg}
              fullWidth>
              {loading ? <CircularProgress size={24} /> : "Next"}
            </Button>
          </Box>
        </form>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={errMsg === "Invalid Credentials" ? "error" : "success"}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}>
          {errMsg}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}

export default AvinodeCredentials;
