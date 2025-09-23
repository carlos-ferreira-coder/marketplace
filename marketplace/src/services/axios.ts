import axios from "axios";

const marketplaceApi = process.env.API_BASE_URL;

export const apiAxios = axios.create({
  baseURL: marketplaceApi,
});
