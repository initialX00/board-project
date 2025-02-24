import axios from "axios";
import { api } from "../configs/axiosConfig";

export const joinApi = async (joinInfo) => {
    return await api.post("/api/auth/join", joinInfo);
}
