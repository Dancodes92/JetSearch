import React, { useRef, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import logo from "../2.png";
import Link from "@mui/material/Link";

function EmailandPassword({ email, pwd, setEmail, setPwd, onNextStep }) {
  const [confirmPwd, setConfirmPwd] = useState("");

  const doPasswordsMatch = () => {
    if (pwd === confirmPwd) {
      return true;
    } else {
      return false;
    }
  };

  const canClickNext = [email, pwd].every(Boolean);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <img src={logo} alt="JetSearch Logo" width="150px" height="150px" />

        <Typography variant="body1">Sign up</Typography>
        <Box component="form" onSubmit={onNextStep} noValidate sx={{ mt: 1 }}>
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
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            helperText="Please enter your password"
            value={pwd}
            onChange={e => setPwd(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            helperText="Password must match"
            value={confirmPwd}
            onChange={e => setConfirmPwd(e.target.value)}
            error={!doPasswordsMatch()}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!canClickNext}
            sx={{ mt: 3, mb: 2 }}>
            Next
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default EmailandPassword;
