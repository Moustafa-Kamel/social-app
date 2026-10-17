import * as zod from 'zod'
import { registerSchema } from './register.zod';

// {typeScript Form }
export type UserDataType = zod.infer<typeof registerSchema>
// {typeScript Form }



// {typeScript Response El Form}
export interface RegisterResponseType {
  success: boolean
  message: "user already exists."|"account created"
  data: Data
  errors: string
}
// {typeScript Response El Form}


export interface Data {
  token: string
  tokenType: string
  expiresIn: string
  user: User
}

export interface User {
  _id: string
  name: string
  username: string
  email: string
  photo: string
  cover: string
}
