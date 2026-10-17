import type { BookmarkPostsResponse, CreatePostResponse, Post, Posts, PostsResponse, SinglePostResponse } from "./posts.types";
import { api } from "../../lib/axios";

export async function getHomeFeed(page: number, limit = 10): Promise<Posts> {
    const res = await api.get<PostsResponse>("/posts/feed", {
        params: { limit, page },
    });
    return res.data;
}

export async function getBookmarks(page = 1, limit?: number): Promise<Posts> {
  const res = await api.get<BookmarkPostsResponse>("/users/bookmarks", {
    params: { page, ...(limit && { limit }) },
  });

  return {
    success: res.data.success,
    message: res.data.message,
    data: { posts: res.data.data.bookmarks },
    meta: res.data.meta,
  };
}

export async function getUserPosts(userId: string, page: number, limit = 10): Promise<Posts> {
  const res = await api.get<PostsResponse>(`/users/${userId}/posts`, { params: { page, limit } });
  return res.data;
}
export async function getAllPosts(page: number, limit = 10): Promise<Posts> {
    const res = await api.get<PostsResponse>(`/posts`, {
        params: {
            page,
            limit,
        },
    });

    return res.data;
}
export async function getPostDetailsApi(postId: string): Promise<Post> {
    const res = await api.get<SinglePostResponse>(`/posts/${postId}`);
    return res.data.data.post;
}


export async function toggleLikePostApi(postId: string) {
    const res = await api.put(`/posts/${postId}/like`)
    return res.data
}

export async function creatPostApi({ body, file }: { body: string, file?: File }) {
    const formData = new FormData();
    formData.append('body', body)
    if (file) {
        formData.append('image', file)
    }

    const res = await api.post<CreatePostResponse>(`/posts`, formData)
    return res.data
}
export async function toggleBookmarkApi(postId: string) {
    const res = await api.put(`/posts/${postId}/bookmark`)
    return res.data
}

export async function deletePostApi(postId: string) {
    const res = await api.delete(`/posts/${postId}`)
    return res.data

}

export async function sharePostApi({ postId, body }: { postId: string, body?: string }) {
    const res = await api.post(`/posts/${postId}/share`, { body })
    return res.data

}

export async function updatePostApi({ postId, body, file }: { postId: string, body: string, file?: File }) {
    const formData = new FormData();
    formData.append('body', body)
    if (file) {
        formData.append('image', file)
    }

    const res = await api.put(`/posts/${postId}`, formData)
    return res.data
}
