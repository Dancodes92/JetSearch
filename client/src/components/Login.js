import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "../2.png";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
      {"Copyright © "}
      <Link color="inherit" href="jetsearch.info">
        JetSearch.info
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const { setAuth } = useAuth();
  const [errMsg, setErrMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const pwd = data.get("password");

    try {
      const response = await axios.post(
        "https://jetsearcher.herokuapp.com/auth/login",
        { email, password: pwd }
      );
      window.localStorage.setItem("token", response.data.token);
      const token = response?.data?.token;
      setAuth({ email, pwd, token });
      navigate("/");
    } catch (err) {
      setErrMsg("Invalid Credentials");
    }
    setLoading(false);
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
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <img src={logo} alt="JetSearch Logo" width="150px" height="150px" />

          <Typography variant="body1">Sign In</Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              helperText="Please enter your email address"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText="Please enter your password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}>
              {loading ? <CircularProgress /> : "Sign In"}
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}>
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleClose}
            severity="error"
            anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            {errMsg}
          </MuiAlert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}
