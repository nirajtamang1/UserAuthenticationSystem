import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authProvider";
import { Outlet } from "react-router-dom";

function Private() {
  const [ok, setOk] = useState(false);
  const { user } = useAuth();
  useEffect(() => {
    {
      user?.role == 1 && setOk(true);
    }
  }, []);
  return ok && <Outlet />;
}

export default Private;
