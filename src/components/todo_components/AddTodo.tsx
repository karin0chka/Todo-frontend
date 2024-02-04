import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Textarea,
} from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"

import { AddIcon } from "@chakra-ui/icons"
import { useMutation } from "react-query"
import * as Yup from "yup"
import style from "../../style.module.css"
import api from "../../utils/api"

interface AddTodoProps {
  refetch: () => void
}

export default function AddTodo({ refetch }: AddTodoProps) {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
  })

  const todoRequest = useMutation({
    mutationFn: api.Todo.createTodo,
    onSuccess() {
      refetch
    },
  })

  return (
    <Formik
      validateOnBlur
      validateOnMount
      initialValues={{
        title: "",
        description: "",
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        todoRequest.mutate(values, { onSuccess: () => resetForm() })
        setSubmitting(false)
      }}
      validationSchema={validationSchema}>
      {({ errors, touched, handleChange, isValid }) => (
        <Form className={style.wrapper}>
          <FormControl
            isInvalid={!!errors.title && touched.title}
            className={style.inlineWrapper}>
            <Field
              as={Input}
              type="text"
              id="title"
              name="title"
              size="sm"
              placeholder="Title"
              onChange={handleChange}
            />

            {errors.title && touched.title && (
              <FormErrorMessage>{errors.title}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            isInvalid={!!errors.description && touched.description}
            className={style.inlineWrapper}>
            <Field
              as={Textarea}
              type="text"
              id="description"
              name="description"
              size="sm"
              placeholder="Description"
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
            <AddIcon boxSize={3} />
          </Button>

          {/* <DeleteTodo /> */}
        </Form>
      )}
    </Formik>
  )
}
