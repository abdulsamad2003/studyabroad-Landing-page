import axios from "axios";
import { appConfig } from "@/config/app-config";

export const api = axios.create({
  baseURL: appConfig.apiUrl,
  headers: { "Content-Type": "application/json" },
});

export default api;
