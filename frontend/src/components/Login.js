import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/authProvider";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );
      // console.log(res.data);
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/profile");
        console.log("Succesfully");
      } else {
        toast.error("Invalid Information");
      }
    } catch (error) {
      toast.error("Invalid Information");
    }
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-centerr"
        style={{ height: "100vh" }}
      >
        <div>
          <div className="mb-3">
          </div>

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
            <div>
              <Link
                to="/signup"
                style={{ color: "#555555", marginLeft: "10px" }}
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
