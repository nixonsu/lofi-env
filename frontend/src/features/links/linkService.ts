import axios from "axios";
import { ILink } from "../../types";

const API_URL = "/api/links";

const getLinks = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const createLink = async (linkData: object, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, linkData, config);
  return response.data;
};

const deleteLink = async (linkData: ILink, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + `/${linkData._id}`, config);
  return response.data;
};

const updateLink = async (linkData: ILink, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + `/${linkData._id}`,
    linkData,
    config
  );
  return response.data;
};

const linkService = {
  getLinks,
  createLink,
  deleteLink,
  updateLink,
};

export default linkService;
