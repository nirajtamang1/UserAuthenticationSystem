import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <h1>Welcome</h1>
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
    </>
  );
}

export default Home;