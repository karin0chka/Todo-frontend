import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Checkbox,
  ListItem,
} from "@chakra-ui/react"
import { ITodo } from "../../../interfaces/interfaces"
import UpdateTodo from "./UpdateTodo"
import DeleteTodo from "./DeleteTodo"
import { useMutation } from "react-query"
import api from "../../utils/api"

export default function Todo({ todo }: { todo: ITodo }) {
  const { mutate } = useMutation({
    mutationFn: api.Todo.isDoneTodo,
  })

  function todoIsDone() {
    mutate(todo)
  }

  return (
    <ListItem style={{ listStyleType: "none", padding: "5px" }}>
      <Accordion allowToggle>
        <AccordionItem
          display="grid"
          gridGap={2}
          gridTemplateColumns="3% 1fr 10% 10%">
          <Checkbox
            alignItems="start"
            mt="10px"
            isChecked={todoIsDone}></Checkbox>
          <Box
            display="flex"
            flexDirection="column">
            <h2>
              <AccordionButton>
                <Box
                  flex="1"
                  textAlign="left"
                  width="100%">
                  {todo.title}
                </Box>
                <AccordionIcon justifyContent="flex-eng" />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>{todo.description}</AccordionPanel>
          </Box>
          <UpdateTodo todo={todo} />
          <DeleteTodo todo={todo} />
        </AccordionItem>
      </Accordion>
    </ListItem>
  )
}
