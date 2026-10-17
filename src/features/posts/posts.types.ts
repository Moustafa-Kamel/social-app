export interface User {
  _id: string
  name: string
  username: string
  photo: string
}
export interface Pagination {
  currentPage: number
  numberOfPages: number
  limit: number
  nextPage: number
  total: number
}

export interface Meta {
  pagination: Pagination
}
export interface Post {
  _id: string
  body?: string
  privacy: string
  user: User
  sharedPost?: SharedPostType | null
  likes?: string[] | number[] | null
  createdAt: string
  commentsCount?: number
  topComment: TopComment | null
  sharesCount?: number
  likesCount?: number
  isShare?: boolean
  id: string
  bookmarked?: boolean
  image?: string
}
export interface SinglePostData {
  post: Post;
}

export interface SinglePostResponse {
  success: boolean;
  message: string;
  data: SinglePostData;
}
export interface SharedPostType {
  _id: string
  body: string
  image?: string
  privacy: string
  user: User
  sharedPost: Post | null
  likes: string[]
  createdAt: string
  commentsCount: number
  topComment: string | null
  sharesCount: number
  likesCount: number
  isShare: boolean
  id: string
}


export interface BookmarkPostsResponse {
  success: boolean
  message: string
  data: DataBookMarkPosts
  meta: Meta
}

export interface DataBookMarkPosts {
  bookmarks: BookmarkPostsType[]
}
export interface BookmarkPostsType {
  _id: string
  body: string
  image?: string
  privacy: string
  user: User
  sharedPost: SharedPostType | null
  likes: string[]
  createdAt: string
  commentsCount: number
  topComment: TopComment
  sharesCount: number
  likesCount: number
  isShare: boolean
  id: string
  bookmarked: boolean
}


export interface TopComment {
  _id: string
  content: string
  commentCreator: User
  post: string
  parentComment: TopComment | null
  likes: string[]
  createdAt: string
}


export interface AllPostsData {
  posts: Post[]
  
}

export interface Posts {
  success: boolean
  message: string
  data: AllPostsData
  meta?: Meta
}

export interface CommentCreator {
  _id: string
  name: string
  username: string
  photo: string
}

export interface CreatePostResponseData {
  post: Post;
}


export interface PostsResponse {
  success: boolean;
  message: string;
  data: AllPostsData;
  meta?: Meta;
}
// export interface Data {
//   post: Post
// }
export interface CreatePostResponse {
  success: boolean;
  message: string;
  data: CreatePostResponseData;
}
