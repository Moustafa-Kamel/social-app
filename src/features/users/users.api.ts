import { api } from "../../lib/axios";
import type { SuggestionsFollowResponse } from "./users.types";

export async function getFollowSuggestions(page = 1, limit = 10) {
    const res = await api.get<SuggestionsFollowResponse>(`/users/suggestions`,{ params: { page, limit } });
    return res.data
}
export async function toggleFollowApi(userId:string) {
    const res = await api.put(`/users/${userId}/follow`);
    return res.data
}

export const changePasswordApi = (v: { password: string; newPassword: string }) =>
  api.patch("/users/change-password", v).then((r) => r.data);