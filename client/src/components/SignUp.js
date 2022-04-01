import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import EmailandPassword from "./EmailandPassword";
import AvinodeCredentials from "./AvinodeCredentials";
import FlpCredentials from "./FlpCredentials";

function SignUp() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const [avinodeEmail, setAvinodeEmail] = useState("");
  const [avinodePwd, setAvinodePwd] = useState("");

  const [flpemail, setFlpemail] = useState("");
  const [flppwd, setFlppwd] = useState("");

  const [step, setStep] = useState(1);
  const [errMsg, setErrMsg] = useState("");

  const registerUser = async () => {
    try {
      const res = await axios.post(
        "auth/signup",
        { email, password: pwd, flightListProEmail: flpemail, flightListProPassword: flppwd, avinodeEmail, avinodePassword: avinodePwd },
      );
      window.localStorage.setItem("token", res.data.token);
      const token = res?.data?.token;
      setAuth({ email, pwd, token });
      navigate("/");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Already a Member");
      } else {
        setErrMsg("Sign Up Failed");
      }
    }
  };

  if(errMsg) {
    setTimeout(() => {
      setErrMsg("");
    }, 3000);

    return (
      <section>
        <p className="errmsg">{errMsg}</p>
      </section>
    );
  }

  const onNextStep = () => {
    setStep(step + 1);
  };

  const onPrevStep = () => {
    setStep(step - 1);
  };

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
          onPrevStep={onPrevStep}
          flpemail={flpemail}
          flppwd={flppwd}
          setFlpemail={setFlpemail}
          setFlppwd={setFlppwd}
          onSubmit={registerUser}
        />
      );
    default:
      return null;
  }
}

export default SignUp;
