import React from "react";
import { Link } from "react-router-dom";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { authed, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav>
      {authed ? (
        <>
          <Link to="/search">Search</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
