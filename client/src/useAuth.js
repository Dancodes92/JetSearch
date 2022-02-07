import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import SetAuthToken from "./SetAuthToken";

const authContext = createContext();

export function useAuth() {
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState({});

  return {
    authed,
    user,
    login: (email, password) => {
      axios
        .post("/auth/login", { email, password })
        .then(res => {
          setAuthed(true);
          setUser(res.data);
          SetAuthToken(res.data.token);
          localStorage.setItem("token", res.data.token);
        })
        .catch(err => {
          console.log(err);
        });
    },
    logout: () => {
      setAuthed(false);
      setUser({});
      localStorage.removeItem("token");
    },
    signUp: (
      email,
      password,
      avinodeUsername,
      avinodePassword,
      flightListProUsername,
      flightListProPassword
    ) => {
      axios
        .post("/auth/signup", {
          email,
          password,
          avinodeUsername,
          avinodePassword,
          flightListProUsername,
          flightListProPassword,
        })
        .then(res => {
          setAuthed(true);
          setUser(res.data);
          localStorage.setItem("token", res.data.token);
          return res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getUserByToken: () => {
      axios
        .get("/auth/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(res => {
          setAuthed(true);
          setUser(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return useContext(authContext);
}
