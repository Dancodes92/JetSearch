import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useLocation } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { login, authed } = useAuth();
  const { state } = useLocation();

  useEffect(() => {
    if (authed) {
      navigate("/search");
    }
  }, [authed, navigate, state]);

  console.log(state);


  const handleLogin = (email, password) => {
    login(email, password);

  };


  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleLogin(e.target.email.value, e.target.password.value);
      }}>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      {state && state.path && <p>{state.path}</p>}
    </div>
  );
}




export default Login;
