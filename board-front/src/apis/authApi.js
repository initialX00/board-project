import { api } from "../configs/axiosConfig";

export const joinApi = async (joinInfo) => {
    return await api.post("/api/auth/join", joinInfo);
}

export const loginApi = async (loginInfo) => {
    return await api.post("/api/auth/login", loginInfo);
}

export const sendAuthMailApi = async (username) => {
    return await api.post("/api/auth/email", {username});
}