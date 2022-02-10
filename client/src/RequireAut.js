import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

function RequireAuth({ children }) {
  const { authed, user, me } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();


  return user ? (
    children
  ) : (
    <Navigate to="/" replace state={{ path: location.pathname }} />
  );
}

export default RequireAuth;
