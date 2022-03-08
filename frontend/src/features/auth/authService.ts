import axios from "axios";
// This file is responsible for sending/receiving http requests

export interface User {
  name: string;
  email: string;
  password: string;
}

const API_URL = "/api/users/";

// Register User
const register = async (userData: object) => {
  const response = await axios.post(API_URL, userData);
  // If response.data is received, save to local storage
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const authService = {
  register,
};

export default authService;
