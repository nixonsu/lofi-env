import axios from "axios";

const API_URL = "/api/tasks";

const getTasks = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const createTask = async (taskData: object, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, taskData, config);
  return response.data;
};

const deleteTask = async () => {};

const taskService = {
  getTasks,
  createTask,
  deleteTask,
};

export default taskService;
