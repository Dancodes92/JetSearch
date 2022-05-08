import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import logo from "../1.png";
import { Button, AppBar, Box, Toolbar, Typography } from "@mui/material";

function Navbar() {
  const { auth, setAuth, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setAuth({});
    navigate("/login");
  };

  const authed = auth.token;

  const displayUserEmail = () => {
    if (user) {
      return (
        <Box display="flex" justifyContent="center">
          <Typography
            variant="caption"
            component="h1"
            gutterBottom
            sx={{
              ml: 2,
            }}>
            {user.email}
          </Typography>
        </Box>
      );
    }
  };

  return (
    <>
      <AppBar position="sticky">
        <Box
          sx={{
            flexGrow: 1,
          }}>
          <Toolbar>
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                style={{
                  width: "60px",
                  height: "60px",
                  margin: "0px",
                  padding: "0px",
                  cursor: "pointer",
                  marginTop: "5px",
                }}
              />
            </Link>
            {authed ? (
              <Box display="flex" justifyContent="flex-end">
                {displayUserEmail()}
              </Box>
            ) : null}
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "flex-end",
              }}>
              {authed ? (
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <>
                  <Button color="inherit" onClick={() => navigate("/login")}>
                    Login
                  </Button>
                  <Button color="inherit" onClick={() => navigate("/signup")}>
                    Signup
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Box>
      </AppBar>
    </>
  );
}

export default Navbar;
