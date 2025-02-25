import { api } from "../configs/axiosConfig";

export const getUserMeApi = async () => await api.get("/api/user/me");