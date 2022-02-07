import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const authContext = createContext();

export function useAuth() {
  const[authed, setAuthed] = useState(false);
  const[user, setUser] = useState({});

  return {
    authed,
    user,
    login: (username, password) => {
      axios
        .post("/auth/login", { username, password })
        .then(res => {
          setAuthed(true);
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
    signUp: (username, password, avinodeUsername, avinodePassword, flightListProUsername, flightListProPassword) => {
      axios
        .post("/auth/signup", { username, password, avinodeUsername, avinodePassword, flightListProUsername, flightListProPassword })
        .then(res => {
          setAuthed(true);
          localStorage.setItem("token", res.data.token);
        })
        .catch(err => {
          console.log(err);
        });

    },
    getUser: () => {
      axios
        .get("/auth/me")
        .then(res => {
          setAuthed(true);
          setUser(res.data.user);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export default function AuthConsumer() {
  return useContext(authContext)
}


