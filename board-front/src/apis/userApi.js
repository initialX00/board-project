import { api } from "../configs/axiosConfig";

export const getUserMeApi = async () => await api.get("/api/user/me");

export const updateProfileImgApi = async (formData) => {
    return await api.post(
        "/api/user/profile/img", 
        formData, 
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
}

export const updateNicknameApi = async (nickname) => await api.put("/api/user/profile/nickname", {nickname});
export const updatePasswordApi = async (password) => await api.put("/api/user/profile/password", {password});
    