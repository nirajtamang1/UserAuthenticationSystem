import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ user: null, token: "" });
  
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
}
// Creating custom context api
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
