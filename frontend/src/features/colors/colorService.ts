import axios from "axios";
import { IColor } from "../../types";

const API_URL = "/api/colors";

const getColors = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const updateColor = async (colorData: IColor, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + `/${colorData._id}`,
    colorData,
    config
  );
  return response.data;
};

const colorService = {
  getColors,
  updateColor,
};

export default colorService;
