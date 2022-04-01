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
      const response = await axios.post("api/avinode", {
        email,
        password: pwd,
      });
      if (response.data === "logged in") {
        console.log("response", response.data);
        setAvinodeEmail(email);
        setAvinodePwd(pwd);
        setIsValidCredentials(true);
        onNextStep();
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

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {errMsg && <h3>{errMsg}</h3>}
      <section>
        <div className="login-form">
        <h1 className="login-title2">
          Enter <span className="italic"> Avinode.com </span> Credentials
        </h1>
        <form onSubmit={handleSubmit} className="form-container" >
          <input
            type="text"
            id="text"
            autoComplete="off"
            onChange={e => setEmail(e.target.value)}
            required
            aria-describedby="uidnote"
            placeholder="Avenode email"
          />
          <br />
          <input
            type="password"
            id="password"
            required
            onChange={e => setPwd(e.target.value)}
            placeholder="Avenode password"
          />
          <br />
          <div className="btn-wrapper2">
            <button type="submit" className="forward">Submit</button>
           <button type="button" onClick={onPrevStep} className="back">Back</button>
          </div>
        </form>
        </div>
      </section>
    </>
  );
}

export default AvinodeCredentials;
