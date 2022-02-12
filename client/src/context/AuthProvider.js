import { createContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const token = window.localStorage.getItem("token");
  const [auth, setAuth] = useState({
    token,
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
