import { useQuery } from "@tanstack/react-query";
import { getCategoriesApi, getSearchBoardListApi } from "../apis/boardApi";

export const useGetCategories = () => useQuery({
    queryKey: ["useGetCategories"],
    queryFn: getCategoriesApi,
    retry: 0,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 5
});

export const useGetSearchBoardList = () => useQuery({
    queryKey: ["useGetSearchBoardList"],
    queryFn: async () => {
        const params = { //초기값 설정
            page: 1,
            limitCount: 15,
            order: "recent",
            searchText: "",
        };
        return await getSearchBoardListApi(params);
    },
    retry: 0,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 5
});