import axios from "axios";
import { useState } from "react";
import Spinner from "./Spinner";

function FlpCredentials({
  onPrevStep,
  setFlpemail,
  setFlppwd,
  onSubmit,
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
      const response = await axios.post("https://jetsearcher.herokuapp.com/api/flp", {
        email,
        password: pwd,
      });
      if (response.data === "logged in") {
        console.log("response", response.data);
        setFlpemail(email);
        setFlppwd(pwd);
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
    //wait for 3 seconds then call onSubmit
    setTimeout(() => {
      onSubmit();
    }, 2000);
  };

  if (errMsg) {
    setTimeout(() => {
      setErrMsg("");
    }, 2000);

    return (
      <section>
        <p className="errmsg">{errMsg}</p>
      </section>
    );
  }

  if (isValidCredentials) {
    return (
      <section>
        <h2>Valid Credentials</h2>
        {sendToNextStep()}
      </section>
    );
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {errMsg && <p>{errMsg}</p>}
      <section>
      <div className="login-form">
        <h1 className="login-title2">
          Enter <span className="italic"> FlightListPro.com </span> Credentials
        </h1>
        <form onSubmit={handleSubmit} className="form-container">
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="FLP Email"
          />
          <br/>
          <input
            type="password"
            id="password"
            value={pwd}
            onChange={e => setPwd(e.target.value)}
            required
            placeholder="FLP Password"
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

export default FlpCredentials;
