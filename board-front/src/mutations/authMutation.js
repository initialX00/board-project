import { useMutation } from "@tanstack/react-query";
import { joinApi } from "../apis/authApi";

export const useJoinMutation = () => useMutation({
    mutationKey: ["joinMutatuion"],
    mutationFn: joinApi,
    retry: 0,
});