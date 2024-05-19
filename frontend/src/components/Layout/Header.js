import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/authProvider";

const Header = () => {
  const { user } = useAuth();

  return (
    <div className="d-flex justify-content-center header">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      {user?.role === 1 && <NavLink to="/admin/userInfo">UserInfo</NavLink>}
    </div>
  );
}

export default Header;
