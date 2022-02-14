import React, { useRef, useState, useEffect } from 'react'
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFontAwesomeIcon,
  FontAwesomeIcon,
} from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom'

function EmailandPassword({ email, pwd, setEmail, setPwd, onNextStep }) {
  const userRef = useRef();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [userFocus, setUserFocus] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [matchPwd, setMatchPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd, matchPwd]);


  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign Up</h1>
      <form>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          ref={userRef}
          autoComplete="off"
          onChange={e => setEmail(e.target.value)}
          required
          aria-describedby="uidnote"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          required
          onChange={e => setPwd(e.target.value)}
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        <label htmlFor="confirm_pwd">
          Confirm Password:
          <span className={validMatch && matchPwd ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="password"
          id="confirm_pwd"
          onChange={e => setMatchPwd(e.target.value)}
          required
          aria-describedby="confirmnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <p
          id="confirmnote"
          className={matchFocus && !validMatch ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Password does not match!
        </p>
        <button disabled={!email || !pwd || !validMatch ? true : false}
        onClick={() => {
          onNextStep()
        }}>
          Next
        </button>
      </form>
      <p>
        Already a Member?
        <br />
        <span className="line">
          <Link to="/login">Login</Link>
        </span>
      </p>
    </section>
  )
}

export default EmailandPassword
