import { IUser } from "./user.interfaces.ts"

export type ITodo = {
  user: IUser
  title: string
  description: string
}
