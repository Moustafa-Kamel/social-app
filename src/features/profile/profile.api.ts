import { api } from "../../lib/axios";
import type { AllPostsData } from "../posts/posts.types";
import type { UserProfileResponse } from "./profile.types";

export const getMyProfile = () => api.get<UserProfileResponse>("/users/profile-data").then((r) => r.data);
export const getUserProfile = (id: string) => api.get<UserProfileResponse>(`/users/${id}/profile`).then((r) => r.data);
export const getUserProfilePosts = (id: string) => api.get<AllPostsData>(`/users/${id}/posts`).then((r) => r.data);
