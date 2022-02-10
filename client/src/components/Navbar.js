import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Outlet, useNavigate } from "react-router-dom";

function Navbar() {
  // display a login / signup button if not logged in, if logged in display a logout button remove
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("accessToken");
    setAuth({});
    navigate("/login");
  };

  console.log(auth);

  //if auth is an empty object, then the user is not logged in and we display the login button and the signup button.
  //if auth is not an empty object, then the user is logged in and we display the logout button.
  const user = auth.email;

  return (
    <>
      {user ? (
        <nav>
          <button onClick={handleLogout}>Logout</button>
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
