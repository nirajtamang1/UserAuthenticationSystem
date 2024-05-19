import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authProvider";
import { toast } from "react-toastify";
import Layout from "../Layout/Layout";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(email, password);
      toast.success("Login Successfully");
      navigate("/profile");
    } catch (error) {
      toast.error("Invalid Email or Password");
    }
  };

  return (
    <>
      <Layout  title="User Authentication System - Login">
        <div className="background">
          <div className="form-container">
            <h2>Login</h2>
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
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className=" button mb-4">
                Login
              </button>
              <div className="d-md-flex justify-content-center">
                <div className="mb-4">
                  <Link to="/signup">Sign Up</Link>
                </div>
                <div>
                  <Link to="/forgetPassword">Forget Password</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Login;
