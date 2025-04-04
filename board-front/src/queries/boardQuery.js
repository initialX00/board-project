import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getCategoriesApi, getCategoryBoardListApi, getSearchBoardListApi } from "../apis/boardApi";

export const useGetCategories = () => useQuery({
    queryKey: ["useGetCategories"],
    queryFn: getCategoriesApi,
    retry: 0,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 5
});

export const useGetSearchBoardList = (params) => useQuery({
    queryKey: ["useGetSearchBoardList"],
    queryFn: async () => {
        return await getSearchBoardListApi(params);
    },
    retry: 0,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 5
});

export const useGetCategoryBoardList = (categoryName) => useInfiniteQuery({
    queryKey: ["useGetCategoryBoardList", categoryName],
    queryFn: async ({pageParam = 1}) => {
        const params = {
            page: pageParam,
            limitCount: 14,
        }
        return await getCategoryBoardListApi(categoryName, params);
    },
    retry: 0,
    refetchOnWindowFocus: false,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
        return lastPage.data.nextPage || undefined
    }

});