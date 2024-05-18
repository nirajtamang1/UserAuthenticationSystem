import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="d-flex justify-content-center header">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/profile">Profile</NavLink>
    </div>
  );
}

export default Header;
