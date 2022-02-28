import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

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
  const [isValidCredentials, setIsValidCredentials] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

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
        setIsValidCredentials(true);
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

  const sendToNextStep = () => {
    setTimeout(() => {
      onNextStep();
    }, 2000);
  };

  if (errMsg) {
    setTimeout(() => {
      setErrMsg("");
    }, 3000);

    return (
      <section>
        <p className="errmsg">{errMsg}</p>
      </section>
    );
  }

  if (isValidCredentials) {
    return (
      <section>
        <h2>
          Credentials are valid.
          {sendToNextStep()}
        </h2>
      </section>
    );
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {errMsg && <h3>{errMsg}</h3>}
      <section>
        <h1>
          Enter <span className="italic"> Avinode.com </span> Credentials
        </h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            autoComplete="off"
            onChange={e => setEmail(e.target.value)}
            required
            aria-describedby="uidnote"
          />
          <br />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            required
            onChange={e => setPwd(e.target.value)}
          />
          <br />
          <div>
            <button type="submit">Check Credentials</button>
          </div>
        </form>
        <p>
          <br />
          <span className="line">
            <span style={{ cursor: "pointer" }} onClick={onPrevStep}>
              Back
            </span>
          </span>
        </p>
      </section>
    </>
  );
}

export default AvinodeCredentials;
