import { api } from "../configs/axiosConfig";

export const createBoardApi = async (board) => await api.post(`/api/board/${board.categoryName}`, {title: board.title, content: board.content});
export const getCategoriesApi = async () => await api.get("/api/board/categories");
export const getSearchBoardListApi = async (params) => await api.get("/api/board/list", {params});
export const getCategoryBoardListApi = async (categoryName, params) => await api.get(`/api/board/${categoryName}/list`, {params});