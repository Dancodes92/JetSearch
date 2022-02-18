import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import logo from "../2.png";

function Navbar() {
  // display a login / signup button if not logged in, if logged in display a logout button remove
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

            <button onClick={handleLogout} className="logout">
              Logout
            </button>
          </div>
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
