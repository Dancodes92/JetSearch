import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import logo from "../2.png";

function Navbar() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setAuth({});
    navigate("/login");
  };

  const user = auth.token;

  return (
    <>
      {user ? (
        <nav>
          <div className="nav_links">
            <Link to="/">
              <img src={logo} alt="logo" className="logo" />
            </Link>

            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </nav>
      ) : (
        <nav>
          <div className="nav_links">
            <Link to="/">
              <img src={logo} alt="logo" className="logo" />
            </Link>

            <div className="nav-wrapper">
              <Link to="/login" className="nav_link">Login</Link>
              <br />
              <Link to="/signup" className="nav_link">Signup</Link>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navbar;
