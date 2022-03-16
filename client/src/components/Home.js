import React from 'react'
import { Link } from 'react-router-dom'


function Home() {
  // show button to got to "/flpSearch"
  return (
    <div className="home">
      <h1 className="home-title">Search Flights</h1>
      <p className="home-text">
        Search Avinode and FlightListPro for flights.
      </p>
      <Link to="/flpSearch">
        <button className="home-button">Search FlightListPro.com</button>
      </Link>
      <br />
      {/* <Link to="/avinodeSearch">
        <button className="home-button">Search Avinode.com</button>
      </Link> */}
    </div>
  )
}

export default Home
