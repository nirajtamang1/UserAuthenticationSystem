import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../context/authProvider";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout/Layout";
import { toast } from "react-toastify";

function UpdateProfile() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setName(user?.name);
    setPhone(user?.phone);
    setEmail(user?.email);
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(user);
      await updateProfile({ name, phone, email, password });
      toast.success("Update user profile successfully");
      navigate("/profile");
    } catch (error) {
      toast.error("Profile not updated");
    }
  };
  return (
    <>
      <Layout>
        <div className="background">
          <div className="form-container">
            <h2 className="mb-3">Update Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  id="exampleInputName"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPhone" className="form-label">
                  Phone
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control"
                  id="exampleInputPhone"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter your email"
                  disabled
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter your password"
                />
              </div>
              <button type="submit" className="button btn btn-primary">
                Update
              </button>
              <br />
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default UpdateProfile;
