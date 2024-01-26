import { IUser } from "../../interfaces/user.interfaces";

export namespace LocalStorage {
  export function saveUser(user: IUser) {
    localStorage.setItem("user", JSON.stringify(user));
  }
  export function getUser(): IUser | null {
    const user = localStorage.getItem("user");
    if (user) JSON.parse(user);
    return null;
  }
  export function removeUser() {
    localStorage.removeItem("user");
  }
}
