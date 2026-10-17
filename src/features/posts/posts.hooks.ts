import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { creatPostApi, deletePostApi, getPostDetailsApi, sharePostApi, toggleBookmarkApi, toggleLikePostApi, updatePostApi } from "./posts.api";
import { getErrorMessage } from "../../utils/getErrorMessage";
import toast from "react-hot-toast";
export const onError = (e: unknown) => toast.error(getErrorMessage(e));

// export const useFeed = (page: number) =>
//   useQuery({
//     queryKey: ["posts", "feed", page],
//     queryFn: () => getAllPosts(page),
//     placeholderData: keepPreviousData, // الصفحة القديمة تفضل ظاهرة لحد ما الجديدة تيجي
//   });

export const usePost = (id: string) =>
  useQuery({
    queryKey: ["posts", "detail", id],
    queryFn: () => getPostDetailsApi(id),
    enabled: !!id,
  });

export const useCreatePost = () => {
  const qc = useQueryClient();
  return useMutation({ // انت هنا علشان هتعدل او تمسح او تنشئ
    mutationFn: creatPostApi,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["posts"] }),
    onError,
  });
};

export const useLikePost = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: toggleLikePostApi,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["posts"] }),
    onError,
  })
}
export const useBookmarkPost = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: toggleBookmarkApi,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["posts"] }),
    onError,
  })
}

export const useDeletePost = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deletePostApi,
    onSuccess: () => {
      toast.success("Post deleted");
      qc.invalidateQueries({ queryKey: ["posts"] })
    },
    onError,
  })
}
export const useSharePost = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: sharePostApi,
    onSuccess: () => {
      toast.success("Post shared");
      qc.invalidateQueries({ queryKey: ["posts"] })
    },
    onError,
  })
}
export const useUpdatePost = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updatePostApi,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["posts"] }),
    onError,
  })
}
