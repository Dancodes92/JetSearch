import "./App.css";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Login from "./components/Login";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Layout from "./components/Layout";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";
import Results from "./components/Results";
import FlightListProSearch from "./components/FlightListProSearch";
import AvinodeSearch from "./components/AvinodeSearch";
import AvinodeRoundTrip from "./components/AvinodeRoundTrip";
import FlightListProSearchRoundTrip from "./components/FlightListProSearchRoundTrip";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        {/* protect */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/flpSearch" element={<FlightListProSearch />} />
          <Route path="/flpSearchroundtrip" element={<FlightListProSearchRoundTrip />} />
          <Route path="/avinodeSearch" element={<AvinodeSearch />} />
          <Route path="/avroundtrip" element={<AvinodeRoundTrip />} />
          <Route path="/results" element={<Results />} />
        </Route>
        {/* catch */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}
export default App;
