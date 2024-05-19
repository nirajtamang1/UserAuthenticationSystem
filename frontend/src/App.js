import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Profile from "./components/Profile";
import UpdateProfile from "./components/UpdateProfile";
import ForgetPassword from "./components/Auth/ForgetPassword";
import ResetPassword from "./components/Auth/ResetPassword";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/updateProfile" element={<UpdateProfile />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route
          path="/reset_password/:id/:token"
          element={<ResetPassword />}
        />
      </Routes>
    </div>
  );
}

export default App;
