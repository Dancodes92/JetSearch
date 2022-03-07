import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://jetsearcher.herokuapp.com/auth/login",
        { email, password: pwd }
      );
      window.localStorage.setItem("token", response.data.token);
      const token = response?.data?.token;
      setAuth({ email, pwd, token });
      setEmail("");
      setPwd("");
      navigate("/");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <div className="login-form">
        <h1 className="login-title">Login</h1>
        <form onSubmit={handleSubmit} className="form-container">
          <input
            className="login-input"
            type="Email"
            id="username"
            ref={userRef}
            onChange={e => setEmail(e.target.value)}
            value={email}
            required
            placeholder="Email"
          />

          <input
            className="login-input"
            type="password"
            id="password"
            onChange={e => setPwd(e.target.value)}
            value={pwd}
            placeholder="Password"
            required
          />
          <button className="login-btn">Login</button>
        </form>
        <p className="need-account">
          Need an Account?
          <br />
          <span className="line">
            <Link to="/signup">Sign Up</Link>
          </span>
        </p>
      </div>
    </section>
  );
};

export default Login;
