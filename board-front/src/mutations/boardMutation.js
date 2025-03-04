import { useMutation } from "@tanstack/react-query";
import { createBoardApi } from "../apis/boardApi";

export const useCreateBoardMutation = () => useMutation({
    mutationKey: ["useCreateBoardMutation"],
    mutationFn: createBoardApi,
    retry: 0,
});