import { Checkbox, ListItem } from "@chakra-ui/react"
import { ITodo } from "../../../interfaces/interfaces"
import UpdateTodo from "./UpdateTodo"

export default function Todo({ todo }: { todo: ITodo }) {
  return (
    <ListItem
      shadow="sm"
      display="flex"
      alignItems="center"
      style={{ listStyleType: "none", padding: "5px" }}>
      <Checkbox isChecked={todo.is_done}></Checkbox>
      <h2 style={{ marginLeft: "10px" }}>{todo.title}</h2>
      <UpdateTodo todo={todo} />
    </ListItem>
  )
}
