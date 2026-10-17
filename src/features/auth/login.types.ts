import * as zod from 'zod'
import { loginSchema } from './login.zod';

// {typeScript Form }
export type UserDataType = zod.infer<typeof loginSchema>
// {typeScript Form }



// {typeScript Response El Form}
export interface LoginResponseType {
  success: boolean
  message: string
  data: Data
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
