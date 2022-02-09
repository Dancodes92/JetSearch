import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AuthConsumer from "./useAuth";

function SignUp() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [avinodeUserName, setAvinodeUsername] = React.useState("");
  const [avinodePassword, setAvinodePassword] = React.useState("");
  const [flightListProUserName, setFlightListProUsername] = React.useState("");
  const [flightListProPassword, setFlightListProPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const navigate = useNavigate();
  const { authed, signUp } = useAuth();
  const { state } = useLocation();


  React.useEffect(() => {
    if (authed) {
      navigate("/search");
    }
  }, [authed, navigate, state]);

  const handleSubmit = e => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return alert("Passwords do not match");
    }
    if (
      !avinodeUserName ||
      !avinodePassword ||
      !flightListProUserName ||
      !flightListProPassword
    ) {
      setError("Please fill out all fields");
      return alert("Please fill out all fields");
    }
     signUp(
      email,
      password,
      avinodeUserName,
      avinodePassword,
      flightListProUserName,
      flightListProPassword
    );
    navigate("/search");

  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <label>Confirm Password</label>
        <input
          type="password"
          name="passwordConfirm"
          placeholder="Confirm Password"
          value={passwordConfirm}
          onChange={e => setPasswordConfirm(e.target.value)}
        />
        <label>Avinode Username</label>
        <input
          type="text"
          name="avinodeUsername"
          placeholder="Avinode Username"
          value={avinodeUserName}
          onChange={e => setAvinodeUsername(e.target.value)}
        />
        <label>Avinode Password</label>
        <input
          type="password"
          name="avinodePassword"
          placeholder="Avinode Password"
          value={avinodePassword}
          onChange={e => setAvinodePassword(e.target.value)}
        />
        <label>FlightListPro Username</label>
        <input
          type="text"
          name="flightListProUsername"
          placeholder="FlightListPro Username"
          value={flightListProUserName}
          onChange={e => setFlightListProUsername(e.target.value)}
        />
        <label>FlightListPro Password</label>
        <input
          type="password"
          name="flightListProPassword"
          placeholder="FlightListPro Password"
          value={flightListProPassword}
          onChange={e => setFlightListProPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
