import axios from "axios";
import { ITask } from "../../types";

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

const deleteTask = async (taskData: ITask, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + `/${taskData._id}`, config);
  return response.data;
};

const updateTask = async (taskData: ITask, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + `/${taskData._id}`,
    taskData,
    config
  );
  return response.data;
};

const taskService = {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
};

export default taskService;
