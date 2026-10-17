import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyProfile, getUserProfile } from "./profile.api";
import { getBookmarks, getUserPosts } from "../posts/posts.api";
import { uploadProfilePhoto } from "../../Components/layout/Navbar/NavbarPhoto.Services";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { useContext } from "react";
import { UserAuthContext } from "../../app/providers/UserAuthProvider/UserAuthContext";

export const useUserProfile = (id: string) =>
  useQuery({
    queryKey: ["users", "profile", id],
    queryFn: () => getUserProfile(id),
    enabled: !!id,
  })

export const useUserPostsCount = (userId: string) =>
  useQuery({
    queryKey: ["posts", "count", userId],
    queryFn: () => getUserPosts(userId, 1, 1), // صفحة 1، عنصر واحد
    select: (res) => res.meta?.pagination?.total ?? 0,
    enabled: !!userId,
  });
  export const useUploadPhoto = () => {
  const qc = useQueryClient();
  const { setUserData } = useContext(UserAuthContext);
  return useMutation({
    mutationFn: uploadProfilePhoto,
    onSuccess:async () => {
      const me = await getMyProfile();
      setUserData((prev) => (prev ? { ...prev, photo: me.data.user.photo } : prev));
      toast.success("Profile photo updated");
      qc.invalidateQueries({ queryKey: ["users"] });
      qc.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
};

export const useBookmarkStats = (enabled: boolean) =>
  useQuery({
    queryKey: ["posts", "bookmark-stats"],
    queryFn: () => getBookmarks(),
    select: (res) => ({
      bookmarks: res.meta?.pagination?.total ?? res.data.posts.length, // 21
      savedPosts: res.data.posts.length,                                // 16
    }),
    enabled,
  });