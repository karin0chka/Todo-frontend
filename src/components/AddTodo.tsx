import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input
} from "@chakra-ui/react"
import { Field, Form, Formik, useFormikContext } from "formik"

import { AddIcon } from "@chakra-ui/icons"
import { useMutation } from "react-query"
import * as Yup from "yup"
import { ITodo } from "../../interfaces/todo.interfaces"
import style from "../style.module.css"
import api from "../utils/api"

export default function AddTodo() {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
  })

  const todoRequest = useMutation({
    mutationFn: api.Todo.createTodo,
    onSuccess: () => {
      const formikContext = useFormikContext()
      if (formikContext) {
        formikContext.resetForm()
      }
    },
  })

  function createTodo(val: ITodo) {
    console.log("trigger")
    todoRequest.mutate({
      title: val.title,
      description: val.description,
    })
  }
  const handleSubmit = (values: ITodo) => {
    createTodo(values)
  }

  return (
    <Formik
      validateOnBlur
      validateOnMount
      initialValues={{
        title: "",
        description: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}>
      {({ errors, touched, handleChange, isValid }) => (
        <Form>
          <div className={style.todoFormWrapper}>
            <FormControl
              isInvalid={!!errors.title && touched.title}
              className={style.inlineWrapper}>
              <FormLabel htmlFor="title">Title:</FormLabel>
              <Field
                as={Input}
                type="text"
                id="title"
                name="title"
                onChange={handleChange}
              />

              {errors.title && touched.title && (
                <FormErrorMessage>{errors.title}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              isInvalid={!!errors.description && touched.description}
              className={style.inlineWrapper}>
              <FormLabel htmlFor="description">Description:</FormLabel>
              <Field
                type="text"
                id="description"
                name="description"
                as={Input}
                onChange={handleChange}
              />
              {errors.description && touched.description && (
                <FormErrorMessage>{errors.description}</FormErrorMessage>
              )}
            </FormControl>

            <Button
              type="submit"
              isDisabled={!isValid}
              isLoading={todoRequest.isLoading}
              className={style.button}
              style={{
                background: "#caf0f8",
                height: "40px",
              }}>
              <AddIcon boxSize={3} />
            </Button>
          </div>

          {/* <DeleteTodo /> */}
        </Form>
      )}
    </Formik>
  )
}
