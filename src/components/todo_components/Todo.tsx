import { ListItem } from "@chakra-ui/react"
import { ITodo } from "../../../interfaces/interfaces"
import ShowTodoDescription from "./ShowTodoDescription"

export default function Todo({ todo }: { todo: ITodo }) {
  return (
    <ListItem style={{ listStyleType: "none", padding: "5px" }}>
      <ShowTodoDescription todo={todo} />
    </ListItem>
  )
}
