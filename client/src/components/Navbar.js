import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Outlet, useNavigate } from "react-router-dom";

function Navbar() {
  // display a login / signup button if not logged in, if logged in display a logout button remove
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setAuth({});
    navigate("/login");
  };

  const user = auth.token

  return (
    <>
      {user ? (
        <nav>
          <button onClick={handleLogout} className="logout">Logout</button>
        </nav>
      ) : (
        <nav>
          <div className="nav-wrapper">
          <Link to="/login">Login</Link>
          <br />
          <Link to="/signup">Signup</Link>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navbar;
