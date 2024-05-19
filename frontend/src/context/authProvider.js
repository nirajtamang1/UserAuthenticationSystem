import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/auth/profile`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setUser(res?.data?.user);
        } catch (error) {
          console.log("Error while getting User Profile", error);
          localStorage.removeItem("token");
        }
      }
    }
    fetchData();
  }, []);

  const login = async (email, password) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/auth/login`,
      {
        email,
        password,
      }
    );
    if (res.data.success) {
      localStorage.setItem("token", res.data.token);
      const userProfile = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/auth/profile`,
        {
          headers: { Authorization: `Bearer ${res.data.token}` },
        }
      );

      setUser(userProfile?.data?.user);
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const updateProfile = async (userData) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/auth/profile`,
        userData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser(res?.data?.updatedUser);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("token");
      setUser(null);
      console.log("Delete Profile successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, updateProfile, deleteProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}
// Creating custom context api
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
