export interface CommentsResponseType {
  success: boolean
  message: string
  data: Data
  meta: Meta
}
export interface RepliesResponseType {
  success: boolean;
  message: string;
  data: { replies: Comment[] };
  meta: Meta;
}
export interface Data {
  comments: Comment[]
  replies?: Comment[];
}

export interface Comment {
  _id: string
  content: string
  image?: string;  
  commentCreator: CommentCreator
  post: string
  parentComment: Comment | null;
  likes: string[]
  createdAt: string
  repliesCount: number
}

export interface CommentCreator {
  _id: string
  name: string
  username: string
  photo: string
}

export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  currentPage: number
  limit: number
  total: number
  numberOfPages: number
}
