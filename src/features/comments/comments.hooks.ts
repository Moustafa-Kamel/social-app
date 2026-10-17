import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createCommentApi, createReplyApi, deleteCommentApi, getCommentReplies, getPostComments, toggleLikeCommentApi, updateCommentApi } from "./comments.api";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils/getErrorMessage";

export const useComments = (postId: string) =>
  useInfiniteQuery({
    queryKey: ["comments", postId],
    queryFn: ({ pageParam }) => getPostComments(postId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (last) => {
      const p = last.meta?.pagination;
      return p && p.currentPage < p.numberOfPages ? p.currentPage + 1 : undefined;
    },
  });

export const useCreateComment = (postId: string) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: createCommentApi,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['comments', postId] });
            qc.invalidateQueries({ queryKey: ['posts'] });
        }
    }
    )
}

const listKey = (postId: string, parentId?: string | null) =>
    parentId ? ["replies", parentId] : ["comments", postId];


export const useReplies = (postId: string, commentId: string) =>
    useInfiniteQuery({
        queryKey: ["replies", commentId],
        queryFn: ({ pageParam }: { pageParam: number }) => getCommentReplies(postId, commentId, pageParam),
        initialPageParam: 1,
        getNextPageParam: (last) => {
            const p = last.meta?.pagination;
            return p && p.currentPage < p.numberOfPages ? p.currentPage + 1 : undefined;
        },
    })

export const useCreateReply = (postId: string, commentId: string) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (formData: { body: string, file?: File }) => createReplyApi({ postId, commentId, ...formData }),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["replies", commentId] })
            qc.invalidateQueries({ queryKey: ["comments", postId] })
        },
    });
};

export const useUpdateComment = (postId: string, parentId?: string) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: updateCommentApi,
        onSuccess: () => qc.invalidateQueries({ queryKey: listKey(postId, parentId) }),
        onError: (e) => toast.error(getErrorMessage(e)),
    })
}
export const useDeleteComment = (postId: string, parentId?: string) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: deleteCommentApi,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: listKey(postId, parentId) })
            qc.invalidateQueries({ queryKey: ["posts"] });

        },
        onError: (e) => toast.error(getErrorMessage(e)),
    })
}

export const useLikeComment = (postId: string, parentId?: string) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: toggleLikeCommentApi,
        onSuccess: () => qc.invalidateQueries({ queryKey: listKey(postId, parentId) }),
        onError: (e) => toast.error(getErrorMessage(e)),
    });
};