import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";

function UserInfo() {
  const [users, setUsers] = useState([]);
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/auth/userProfiles`
      );
      if (data.success) {
        setUsers(data.user);
      }
    } catch (error) {
      toast.error("Something went wrong while fetching user information");
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const confirm = window.confirm("Are you sure to delete this account?");
      if (confirm) {
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/auth/deleteUserProfile/${userId}`
        );
        toast.success("User deleted successfully");
        getAllUsers();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while deleting user information");
    }
  };
  return (
    <Layout title="User Authentication System - Users Profile">
      <div className="background">
        <div className="table-container">
          <h1 className="mb-3">Our User</h1>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Email</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UserInfo;
