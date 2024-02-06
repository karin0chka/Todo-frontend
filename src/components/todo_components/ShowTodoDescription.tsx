import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Checkbox,
} from "@chakra-ui/react"
import { ITodo } from "../../../interfaces/interfaces"
import UpdateTodo from "./UpdateTodo"

export default function ShowTodoDescription({ todo }: { todo: ITodo }) {
  return (
    <Accordion allowToggle>
      <AccordionItem
        display="flex"
        alignItems="center"
        justifyContent="space-between">
        <Checkbox isChecked={todo.is_done}></Checkbox>
        <h2 style={{ width: "100%" }}>
          <AccordionButton>
            <Box
              flex="1"
              textAlign="left">
              {todo.title}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>{todo.description}</AccordionPanel>
        <UpdateTodo todo={todo} />
      </AccordionItem>
    </Accordion>
  )
}
