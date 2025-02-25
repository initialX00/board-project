import { useQuery } from "@tanstack/react-query";
import { getUserMeApi } from "../apis/userApi";

export const useUserMeQuery = () => useQuery({
    queryKey: ["userMeQuery"],
    queryFn: getUserMeApi,
    retry: 0,
    staleTime: 1000 * 60 * 20,  // 데이터가 fresh한 시간 
    gcTime: 1000 * 60 * 10,     // 상한데이터를 지우는 시간
});