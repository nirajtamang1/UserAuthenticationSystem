import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authProvider";
import toast from "react-hot-toast";
import Layout from "./Layout/Layout";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await login(email, password);
      console.log(data);
      navigate("/profile");
    } catch (error) {
      toast.error("Invalid Information");
    }
  };

  return (
    <>
      <Layout>
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
              <button type="submit" className=" button mb-2">
                Login
              </button>
              <div className="mt-3">
                <Link to="/signup">Sign Up</Link>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Login;
