export enum UserType {
  ADMIN = "admin",
  CLIENT = "client",
}

export type IDefault = {
  id: number
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
}

export type IUser = {
  first_name: string

  last_name: string

  email: string

  password: string

  refresh_token: string

  user_type: UserType

  todos: ITodo[]
} & IDefault

export type ITodo = {
  title: string
  description: string
  is_done: boolean
  user: IUser
}

export type IReport = {
  user_id: number
  title: string
  description: string
  is_completed: boolean
  is_reviewed: boolean
  media_url: string
}

export type LoginUser = {
  email: string
  password: string
}