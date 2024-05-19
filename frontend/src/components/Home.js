import React from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout/Layout";
import { useAuth } from "../context/authProvider";

const Home = () => {
  const { user } = useAuth();
  return (
    <>
      <Layout title="User Authentication System - Welcome page">
        <div className="background">
          <h1 className="mb-3">Welcome to our User Authentication System</h1>
          {user ? (
            <div>
              <h2 className="mb-3">You are log in as {user.email}</h2>
            </div>
          ) : (
            <div className="info">
              <p className="mb-4">
                Ensure your account's safety with our trusted authentication
                service. Create an account to get started, or log in if you
                already have one.
              </p>
              <div>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}

export default Home;
