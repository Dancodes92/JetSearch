import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFontAwesomeIcon,
  FontAwesomeIcon,
} from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import EmailandPassword from "./EmailandPassword";
import AvinodeCredentials from "./AvinodeCredentials";
import FlpCredentials from "./FlpCredentials";

function SignUp() {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [avinodeEmail, setAvinodeEmail] = useState("");
  const [avinodePwd, setAvinodePwd] = useState("");

  const [flpemail, setFlpemail] = useState("");
  const [flppwd, setFlppwd] = useState("");

  const [step, setStep] = useState(1);




  const [errMsg, setErrMsg] = useState("");

  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);

  // useEffect(() => {
  //   const match = pwd === matchPwd;
  //   setValidMatch(match);
  // }, [pwd, matchPwd]);

  // useEffect(() => {
  //   setErrMsg("");
  // }, [email, pwd, matchPwd]);

  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post(
  //       "auth/signup",
  //       { email, password: pwd },
  //     );
  //     window.localStorage.setItem("token", res.data.token);
  //     const token = res?.data?.token;
  //     setAuth({ email, pwd, token });
  //     navigate("/");
  //   } catch (err) {
  //     if (!err?.response) {
  //       setErrMsg("No Server Response");
  //     } else if (err.response?.status === 409) {
  //       setErrMsg("Already a Member");
  //     } else {
  //       setErrMsg("Sign Up Failed");
  //     }
  //     errRef.current.focus();
  //   }
  // };

  // return (
  //   <section>
  //     <p
  //       ref={errRef}
  //       className={errMsg ? "errmsg" : "offscreen"}
  //       aria-live="assertive"
  //     >
  //       {errMsg}
  //     </p>
  //     <h1>Sign Up</h1>
  //     <form onSubmit={handleSubmit}>
  //       <label htmlFor="email">Email: </label>
  //       <input
  //         type="email"
  //         id="email"
  //         ref={userRef}
  //         autoComplete="off"
  //         onChange={e => setEmail(e.target.value)}
  //         required
  //         aria-describedby="uidnote"
  //         onFocus={() => setUserFocus(true)}
  //         onBlur={() => setUserFocus(false)}
  //       />
  //       <br />
  //       <label htmlFor="password">Password: </label>
  //       <input
  //         type="password"
  //         id="password"
  //         required
  //         onChange={e => setPwd(e.target.value)}
  //         onFocus={() => setPwdFocus(true)}
  //         onBlur={() => setPwdFocus(false)}
  //       />
  //       <label htmlFor="confirm_pwd">
  //         Confirm Password:
  //         <span className={validMatch && matchPwd ? "valid" : "hide"}>
  //           <FontAwesomeIcon icon={faCheck} />
  //         </span>
  //         <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
  //           <FontAwesomeIcon icon={faTimes} />
  //         </span>
  //       </label>
  //       <input
  //         type="password"
  //         id="confirm_pwd"
  //         onChange={e => setMatchPwd(e.target.value)}
  //         required
  //         aria-describedby="confirmnote"
  //         onFocus={() => setMatchFocus(true)}
  //         onBlur={() => setMatchFocus(false)}
  //       />
  //       <p
  //         id="confirmnote"
  //         className={matchFocus && !validMatch ? "instructions" : "offscreen"}
  //       >
  //         <FontAwesomeIcon icon={faInfoCircle} />
  //         Password does not match!
  //       </p>
  //       <button disabled={!email || !pwd || !validMatch ? true : false}>
  //         Sign Up
  //       </button>
  //     </form>
  //     <p>
  //       Already a Member?
  //       <br />
  //       <span className="line">
  //         <Link to="/login">Login</Link>
  //       </span>
  //     </p>
  //   </section>
  // );
  const onNextStep = () => {
    setStep(step + 1);
  }

  const onPrevStep = () => {
    setStep(step - 1);
  }

  switch (step) {
    case 1:
      return (
        <EmailandPassword
          email={email}
          pwd={pwd}
          setEmail={setEmail}
          setPwd={setPwd}
          onNextStep={onNextStep}
          />
      );
    case 2:
      return (
        <AvinodeCredentials
        onNextStep={onNextStep}
        onPrevStep={onPrevStep}
        avinodeEmail={avinodeEmail}
        avinodePwd={avinodePwd}
        setAvinodeEmail={setAvinodeEmail}
        setAvinodePwd={setAvinodePwd}
        step={step}
        />
      );
      case 3:
        return (
          <FlpCredentials
          onNextStep={onNextStep}
          onPrevStep={onPrevStep}
          flpemail={flpemail}
          flppwd={flppwd}
          setFlpemail={setFlpemail}
          setFlppwd={setFlppwd}
          />
        );
      default:
        return null;
  }
}

export default SignUp;

