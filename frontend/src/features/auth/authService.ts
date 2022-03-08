import axios from "axios";
// This file is responsible for sending/receiving http requests

const API_URL = "/api/users/";

// Register User Service
const register = async (userData: object) => {
  const response = await axios.post(API_URL, userData);
  // If response.data is received, save to local storage
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Logout User Service
const logout = () => {
  localStorage.removeItem("user");
};

// Login User Service
const login = async (userData: object) => {
  const response = await axios.post(API_URL + "login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const authService = {
  register,
  logout,
  login
};

export default authService;
