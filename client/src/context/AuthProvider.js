import { createContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const token = window.localStorage.getItem("token");
  const [user , setUser] = useState(null);
  const [auth, setAuth] = useState({
    token,
  });

  const getUser = async () => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await axios.get("https://jetsearcher.herokuapp.com/auth/me", {
        headers: {
          Authorization: token,
        },
      });
      setUser(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) {
      getUser();
    }

    return () => {
      setUser(null);
    }
  }, [token]);

  console.log(user);


  return (
    <AuthContext.Provider value={{ auth, setAuth, user }}>
      {children}

    </AuthContext.Provider>
  )
}

export default AuthContext

