import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import useAuth from "./useAuth";
import { useLocation, Navigate, useNavigate } from "react-router-dom";

function Navbar() {
  const { authed, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
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
