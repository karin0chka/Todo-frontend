import { useState } from "react"
import style from "../style.module.css"
import AddTodo from "../todo_components/AddTodo"
import Todo from "../todo_components/Todo"
import { useQuery } from "react-query"
import api from "../utils/api"
import {
  Box,
  Card,
  CardBody,
  Grid,
  List,
  UnorderedList,
} from "@chakra-ui/react"

export default function Dashboard() {
  const [renderKey, setRenderKey] = useState(0)
  function refetch() {
    setRenderKey(renderKey + 1)
  }

  const { data: todos, error, isLoading } = useQuery("todo", api.User.userTodos)

  if (isLoading) return <div>Fetching posts...</div>
  if (error) return <div>An error occurred</div>

  return (
    <main
      style={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Grid
        gridGap={2}
        gridTemplateColumns={"500px 500px"}
        gridTemplateRows={"500px"}>
        <Card>
          <CardBody
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
            }}>
            <AddTodo refetch={refetch} />
          </CardBody>
        </Card>
        <Card>
          <CardBody style={{ height: "100%" }}>
            <List className={style.viewListStyle}>
              {todos?.map((todo) => (
                <Todo
                  todo={todo}
                  key={todo.id + "todo"}
                />
              ))}
            </List>
          </CardBody>
        </Card>
      </Grid>
    </main>
  )
}
