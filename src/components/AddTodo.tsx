import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react"
import { Field, Formik } from "formik"
import { useMutation } from "react-query"
import { Form } from "react-router-dom"
import style from "../style.module.css"
import api from "../utils/api"
import { LocalStorage } from "../utils/handlers"
import * as Yup from "yup"

export default function AddTodo() {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
  })
  
  const todoRequest = useMutation({
    mutationFn: api.Todo.createTodo,
    onError(err) {
      console.error(err)
    },
  })

  function createTodo(val: any) {
    console.log("trigger")
    todoRequest.mutate({
      user: val.user,
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
          user: LocalStorage.getUser(),
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
