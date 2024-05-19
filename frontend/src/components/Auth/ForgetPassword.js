import React, { useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/forgetPassword`,
        {
          email,
        }
      );
      toast.success("Please check your mail for reset password link!");
      navigate("/login");
    } catch (error) {
      toast.error("Error while resetting password");
    }
  };
  return (
    <Layout>
      <div className="background">
        <div className="form-container">
          <h2 className="mb-3">Forget Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit" className=" button mb-4">
              Send
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default ForgetPassword;
