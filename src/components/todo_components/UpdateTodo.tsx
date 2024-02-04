import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import * as Yup from "yup"
import { ITodo } from "../../../interfaces/interfaces"
import { EditIcon } from "@chakra-ui/icons"

export default function UpdateTodo({ todo }: { todo: ITodo }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
  })
  return (
    <>
      <Button
        onClick={onOpen}
        marginLeft="auto">
        <EditIcon />
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit</ModalHeader>
          <ModalCloseButton />
          <Formik
            validateOnBlur
            validateOnMount
            initialValues={{
              title: todo.title,
              description: todo.description,
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              // todoRequest.mutate(values, { onSuccess: () => resetForm() })
              setSubmitting(false)
            }}
            validationSchema={validationSchema}>
            {({ errors, touched, handleChange, isValid }) => (
              <Form>
                <ModalBody>
                  <FormControl isInvalid={!!errors.title && touched.title}>
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
                    isInvalid={!!errors.description && touched.description}>
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
                </ModalBody>
                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    isDisabled={!isValid}
                    variant="ghost">
                    Update
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  )
}
