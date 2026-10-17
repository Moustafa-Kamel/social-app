import type { CommentsResponseType, RepliesResponseType } from "./comments.types";
import { api } from "../../lib/axios";

export async function getPostComments(
  postId: string,
  page = 1,
  limit = 10
): Promise<CommentsResponseType> {
  const res = await api.get<CommentsResponseType>(`/posts/${postId}/comments`, {
    params: { page, limit },
  });
  return res.data;
}

export async function createCommentApi({ postId, body, file }: { postId: string, body: string, file?: File }) {
  const formData = new FormData();
  formData.append('content', body)
  if (file) {
    formData.append('image', file)
  }
  const res = await api.post(`/posts/${postId}/comments`, formData);
  return res.data;
}

export async function getCommentReplies( postId: string, commentId: string,page = 1, limit = 10 ) {
  const res = await api.get<RepliesResponseType>(
    `/posts/${postId}/comments/${commentId}/replies`,{
      params: {page,limit}
    });
  return res.data;
}

export async function createReplyApi({ postId, body, file, commentId }: { postId: string, body: string, file?: File, commentId: string }) {
  const formData = new FormData();
  formData.append('content', body)
  if (file) {
    formData.append('image', file)
  }
  const res = await api.post(
    `/posts/${postId}/comments/${commentId}/replies?page=1&limit=10`,formData);
  return res.data;
}

export async function updateCommentApi({ postId, body, file, commentId }: { postId: string, body: string, file?: File, commentId: string }) {
  const formData = new FormData();
  formData.append('content', body)
  if (file) {
    formData.append('image', file)
  }
  const res = await api.put(
    `/posts/${postId}/comments/${commentId}`, formData);
  return res.data;
}

export async function deleteCommentApi({ commentId, postId }: { postId: string, commentId: string }) {
  const res = await api.delete(
    `/posts/${postId}/comments/${commentId}`);
  return res.data;
}
export async function toggleLikeCommentApi({ commentId, postId }: { postId: string, commentId: string }) {
    const res = await api.put(
    `/posts/${postId}/comments/${commentId}/like`);
  return res.data;
}