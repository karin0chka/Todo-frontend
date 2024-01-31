import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import { useMutation } from "react-query"
import style from "../style.module.css"
import api from "../utils/api"
import * as Yup from "yup"

export default function AddTodo() {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
  })

  const todoRequest = useMutation({
    mutationFn: api.Todo.createTodo,
   
  })

  function createTodo(val: any) {
    console.log("trigger")
    todoRequest.mutate({
      title: val.title,
      description: val.description,
    })
  }

  return (
    <div className={style.formWrapper}>
      <Formik
        validateOnBlur
        validateOnMount
        initialValues={{
          title: "",
          description: "",
        }}
        onSubmit={createTodo}
        validationSchema={validationSchema}>
        {({ errors, touched, handleChange, isValid }) => (
          <Form>
            <FormControl isInvalid={!!errors.title && touched.title}>
              <FormLabel
                htmlFor="title"
                style={{ textAlign: "center" }}>
                Todo title
              </FormLabel>
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
              isInvalid={!!errors.description && touched.description}>
              <FormLabel
                htmlFor="description"
                style={{ textAlign: "center" }}>
                Todo description
              </FormLabel>
              <Field
                as={Input}
                type="text"
                id="description"
                name="description"
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
              }}>
              Add Todo
            </Button>
            {/* <DeleteTodo /> */}
          </Form>
        )}
      </Formik>
    </div>
  )
}
