import React from "react";
import { useAuth } from "../context/authProvider";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <h1>Profile</h1>
      <div>
        <p>Username: {user?.name}</p>
        <p>Phone: {user?.phone}</p>
        <p>Email: {user?.email}</p>
      </div>
      <Link to="/updateProfile">Edit</Link>
      <button className="btn btn-danger">Delete</button>
      <button className="btn btn-secondary" onClick={handleLogout}>
        LogOut
      </button>
    </div>
  );
}

export default Profile;
