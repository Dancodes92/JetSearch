import "./App.css";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Login from "./components/Login";
import Search from "./components/Search";
import SignUp from "./components/SignUp";
import Layout from "./components/Layout";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";
import Results from "./components/Results";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        {/* protect */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Search />} />
          <Route path="/results" element={<Results />} />
        </Route>
        {/* catch */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}
export default App;
