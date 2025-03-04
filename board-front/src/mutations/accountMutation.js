import { useMutation } from "@tanstack/react-query";
import { sendVerifyEmailApi, updateNicknameApi, updatePasswordApi, updateProfileImgApi } from "../apis/userApi";

export const useUpdateProfileImgMutation = () => useMutation({
    mutationKey: ["useUpdateProfileImgMutation"],
    mutationFn: updateProfileImgApi,
    retry: 0,
});

export const useUpdateNicknameMutation = () => useMutation({
    mutationKey: ["useUpdateNicknameMutation"],
    mutationFn: updateNicknameApi,
    retry: 0,
});

export const useUpdatePasswordMutation = () => useMutation({
    mutationKey: ["useUpdatePasswordMutation"],
    mutationFn: updatePasswordApi,
    retry: 0,
});

export const useSendVerifyEamilMutaion = () => useMutation({
    mutationKey: ["useSendVerifyEmailMutation"],
    mutationFn: sendVerifyEmailApi,
    retry: 0,
})

export const useUpdateEmailMutation = () => useMutation({
    mutationKey: ["useUpdateEmailMutation"],
    mutationFn: updateEmailApi,
    retry: 0,
})