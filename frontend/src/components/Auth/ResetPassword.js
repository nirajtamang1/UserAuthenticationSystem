import React, { useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const { id, token } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(password);
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/reset_password/${id}/${token}`,
        { password }
      );
      console.log(res);
      if (res.data.Status === "Successs") {
        console.log("Successfully updated password");
        toast.success("Password updated successfully!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update password. Please try again.");
    }
  };
  return (
    <Layout>
      <div className="background">
        <div className="form-container">
          <h2 className="mb-3">Reset Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter your email"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className=" button mb-4">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default ResetPassword;
