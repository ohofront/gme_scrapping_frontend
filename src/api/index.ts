import axios, { AxiosInstance } from "axios";

const apiUrl = process.env.REACT_APP_SERVICE_URL;

export const apiScrapClient: AxiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {Accept: "application/json"}
});
