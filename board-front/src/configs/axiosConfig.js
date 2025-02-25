import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080",
});

api.interceptors.request.use(config => {
    const accessToken = localStorage.getItem("AccessToken");
    config.headers.Authorization = accessToken && `Bearer ${accessToken}`;
    return config;
});

export const setTokenLocalStorage = (name, token) => {
    if(!!token) {
        localStorage.setItem(name, token);
    } else {
        localStorage.removeItem(name);
    }
}