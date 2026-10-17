import type { SetStateAction } from "react";

export interface UserAuthContextType {
    userData:UserData | null,
    setUserData: React.Dispatch<SetStateAction<UserData | null>>,
    isLoading:boolean
} 

export interface UserDataResponseTypeForData {
  success: boolean
  message: string
  data: Data
}

export interface Data {
  user: UserData
}

export interface UserData {
  _id: string
  name: string
  username: string
  email: string
  dateOfBirth?: string
  gender?: string
  photo: string
  cover: string
  bookmarks?: unknown[]
  followers?: unknown[]
  following?: unknown[]
  createdAt?: string
  followersCount?: number
  followingCount?: number
  bookmarksCount?: number
  id?: string
}
