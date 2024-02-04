import {
  Card,
  CardBody,
  FormErrorMessage,
  Grid,
  List,
  Spinner,
} from "@chakra-ui/react"
import { useState } from "react"
import { useQuery } from "react-query"
import style from "../style.module.css"
import AddTodo from "../components/todo_components/AddTodo"
import Todo from "../components/todo_components/Todo"
import api from "../utils/api"

export default function Dashboard() {
  const [renderKey, setRenderKey] = useState(0)
  function refetch() {
    setRenderKey(renderKey + 1)
  }

  const { data: todos, error, isLoading } = useQuery("todo", api.User.userTodos)

  return (
    <main
      style={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EDF2F7",
      }}>
      <Grid
        gridGap={2}
        gridTemplateColumns={"500px 500px"}
        gridTemplateRows={"500px"}
        padding="10px">
        <Card boxShadow="lg">
          <CardBody style={{ display: "flex", alignItems: "center" }}>
            <AddTodo refetch={refetch} />
          </CardBody>
        </Card>
        <Card boxShadow="lg">
          <CardBody
            h="100%"
            w="100%"
            display="flex"
            justifyContent="center"
            alignItems="center">
            {error ? (
              <FormErrorMessage>Something went wrong</FormErrorMessage>
            ) : isLoading ? (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            ) : (
              <List className={style.viewListStyle}>
                {todos?.map((todo) => (
                  <Todo
                    todo={todo}
                    key={todo.id + "todo"}
                  />
                ))}
              </List>
            )}
          </CardBody>
        </Card>
      </Grid>
    </main>
  )
}
