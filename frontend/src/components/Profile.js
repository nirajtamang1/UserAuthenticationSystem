import React from "react";
import { useAuth } from "../context/authProvider";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout/Layout";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, logout, deleteProfile } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logout successfully");
    navigate("/");
  };
  const handleDelete = () => {
    const confirm = window.confirm("Are you sure to delete your account?");
    if (confirm) {
      deleteProfile();
      toast.success("Delete Profile successfully");
      navigate("/");
    }
  };
  const updatePage = () => {
    navigate("/updateProfile");
  };
  return (
    <Layout title="User Authentication System - Profile">
      <div className="background">
        <div className="form-container">
          <h1 className="mb-3">Profile</h1>
          {user ? (
            <div>
              <div>
                <p>Username: {user?.name}</p>
                <p>Phone: {user?.phone}</p>
                <p>Email: {user?.email}</p>
              </div>
              <button onClick={updatePage} className="btn btn-primary mx-1">
                Edit
              </button>
              <button className="btn btn-danger mx-1" onClick={handleDelete}>
                Delete
              </button>
              <button className="btn btn-secondary" onClick={handleLogout}>
                LogOut
              </button>
            </div>
          ) : (
            <p>Please Login...</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
