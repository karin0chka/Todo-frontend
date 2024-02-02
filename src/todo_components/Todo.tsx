import { ListItem } from "@chakra-ui/react"

export default function Todo({todo}: any) {
  return (
    <ListItem style={{ listStyleType: "none", padding: "5px" }}>
      {todo.title}
    </ListItem>
  )
}
