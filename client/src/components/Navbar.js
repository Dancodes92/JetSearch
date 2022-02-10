import { faLongArrowAltUp } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Navbar() {
 // display a login / signup button if not logged in, if logged in display a logout button remove
 const { auth, setAuth } = useAuth();

  console.log(auth)

  //if auth is an empty object, then the user is not logged in and we display the login button and the signup button.
  //if auth is not an empty object, then the user is logged in and we display the logout button.

  return (
   <>
   {auth ? (
     <nav>
       <button
       onClick={() => {
        window.localStorage.removeItem("token");
        setAuth(false);
       }
        }
        >
        Logout
        </button>
      </nav>
    ) : (
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </nav>
    )}
    </>
  );
}

export default Navbar;
