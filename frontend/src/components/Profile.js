import React from "react";
import { useAuth } from "../context/authProvider";

function Profile() {
  const [auth] = useAuth();

  return (
    <div>
      <h1>Profile</h1>
      <h1>{auth?.user?.name}</h1>
    </div>
  );
}

export default Profile;
