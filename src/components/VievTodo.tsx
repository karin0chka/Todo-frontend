import { useQuery } from "react-query"
import api from "../utils/api"
import { ListItem, UnorderedList } from "@chakra-ui/react"
import style from "../style.module.css"

export default function ViewTodo() {
  const { data: todos, error, isLoading } = useQuery("todo", api.User.userTodos)

  if (isLoading) return <div>Fetching posts...</div>
  if (error) return <div>An error occurred</div>

  const reversedTodos = [...todos].reverse()

  return (
    <UnorderedList className={style.viewListStyle}>
      {reversedTodos.map((todo: any) => (
        <ListItem
          key={todo.id}
          style={{ listStyleType: "none", padding: "5px" }}>
          {todo.title}
        </ListItem>
      ))}
    </UnorderedList>
  )
}
