import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import SetAuthToken from "./SetAuthToken";

const authContext = createContext();

export function useAuth() {
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState(null);


  return {
    authed,
    user,
    login: async (email, password) => {
      try {
        const res = await axios.post("/auth/login", {
          email,
          password
        });
        console.log("res", res);
        SetAuthToken(res.data.token);
        setAuthed(true);
        setUser(res.data.user);
      } catch (err) {
        console.log(err);
      }
    },
    logout: () => {
      setAuthed(false);
      setUser({});
      window.localStorage.removeItem("token");
    },
    register: async (email, password) => {
      try {
        const res = await axios.post("/auth/register", {
          email,
          password
        });
        SetAuthToken(res.data.token);
        setAuthed(true);
        setUser(res.data.user);
      } catch (err) {
        console.log(err);
      }
    },
   me: async () => {
      try {
        const res = await axios.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`
          }
        });
        setAuthed(true);
        setUser(res.data.user);
      } catch (err) {
        console.log(err);
      }
    }
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return useContext(authContext);
}
