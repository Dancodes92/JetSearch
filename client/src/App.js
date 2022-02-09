import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Login from "./Login";
import RequireAuth from "./RequireAut";
import Search from "./Search";
import { AuthProvider } from "./useAuth";
import SignUp from "./SignUp";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/search"
            element={
              <RequireAuth>
                <Search />
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}
export default App;
