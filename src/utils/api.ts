import axios from "axios"
import { ITodo } from "../../interfaces/todo.interfaces"
import { IUser, LoginUser } from "../../interfaces/user.interfaces"
import config from "./config"
import { LocalStorage } from "./handlers"

const api = config.API

const userId = 1
const reportId = 1
axios.defaults.withCredentials = true

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (
      error.response.status === 401 &&
      !error.response.config.url.includes(`auth/refresh`)
    ) {
      const { status } = await Auth.refresh()

      if (status === 200) {
        return axios(error.response.config)
      } else {
        console.log("Remove on failed refresh")
        LocalStorage.removeUser()
        location.reload()
      }
    } else {
      console.log("Remove on failed both")
      LocalStorage.removeUser()
      location.reload()
    }
    return Promise.reject(error)
  }
)

// Auth request
namespace Auth {
  export async function checkConnection() {
    return (await axios.get(`${api}/health`)).data
  }
  export async function registerUser(userDto: IUser) {
    const response = await axios.post(`${api}/auth/register`, userDto)
    console.log(response.data)
    return response.data
  }

  export async function loginUser(user: LoginUser) {
    const response = await axios.post(`${api}/auth/login`, user)
    console.log(response.data)
    return response.data
  }
  export async function refresh() {
    return await axios.post<string>(`${api}/auth/refresh`)
  }

  export async function logOut() {
    const response = await axios.post(`${api}/auth/log-out`)
    return response.data
  }
  export async function changePassword() {
    const response = await axios.put(`${api}/auth/change-password`)
    return response.data
  }
}

//User request
namespace User {
  export async function getUser() {
    const response = await axios.get(`${api}/user/`)
    return response.data
  }
  export async function updateUserInfo() {
    const response = await axios.put(`${api}/user/`)
    return response.data
  }
  export async function deleteUser() {
    const response = await axios.delete(`${api}/user/${userId}`)
    return response.data
  }
  export async function userTodos() {
    const response = await axios.get<any[]>(`${api}/user/todos`)
    return response.data
  }
}

//do request
namespace Todo {
  export async function createTodo(todo: ITodo) {
    const response = await axios.post(`${api}/todo/`, todo)
    return response.data
  }
  export async function updateTodo() {
    const response = await axios.put(`${api}/todo/${userId}`)
    return response.data
  }
  export async function deleteTodo() {
    const response = await axios.delete(`${api}/todo/${userId}`)
    return response.data
  }
}

namespace Report {
  export async function createTodo() {
    const response = await axios.post(`${api}/report/create`)
    return response.data
  }
  export async function readTodo() {
    const response = await axios.get(`${api}/report/read/${reportId}`)
    return response.data
  }
  export async function updateTodo() {
    const response = await axios.put(`${api}/report/update/${reportId}`)
    return response.data
  }
}

export default { Auth, User, Todo, Report }
