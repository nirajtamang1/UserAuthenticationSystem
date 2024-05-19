import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../Layout/Layout";

function Signup() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/signup`,
        {
          name,
          phone,
          email,
          password,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout>
        <div className="background">
          <div className="form-container">
            <h2 className="mb-3">Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  id="exampleInputName"
                  aria-describedby="emailHelp"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  className="form-control"
                  id="exampleInputPhone"
                  aria-describedby="emailHelp"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter your password"
                />
              </div>
              <button type="submit" className="button btn-primary w-100">
                Submit
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Signup;
