import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react"
import { useMemo, useState } from "react"
import { useMutation } from "react-query"
import { useNavigate, useSearchParams } from "react-router-dom"
import { IUser } from "../../interfaces/user.interfaces"
import api from "../utils/api"
import { LocalStorage } from "../utils/handlers"
import { rules } from "../utils/validation"

export default function Register() {
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShow] = useState(false)
  const [repeatPassword, setRepeatedPassword] = useState("")
  const [_, setSearchParams] = useSearchParams()

  const navigate = useNavigate()

  function validateName(type: "first_name" | "last_name") {
    const name = type === "first_name" ? first_name : last_name
    return (
      rules.required(name) &&
      rules.nameMinLength(name) &&
      rules.nameMaxLength(name)
    )
  }
  function validateEmail() {
    return (
      rules.required(email) && rules.email(email) && rules.emailMaxLength(email)
    )
  }
  function validatePassword() {
    return rules.strongPasswordCheck(password)
  }
  function validateRepeatPassword() {
    return rules.comparePasswords(password, repeatPassword)
  }

  const isFormValid = useMemo(() => {
    const validations = [
      validateName("first_name"),
      validateName("last_name"),
      validateEmail(),
      validatePassword(),
      validateRepeatPassword(),
    ]
    return validations.every((v) => !!v && typeof v === "boolean")
  }, [first_name, last_name, email, password, repeatPassword])

  const mutation = useMutation({
    mutationFn: api.Auth.registerUser,
  })

  function submitData(e: any) {
    e.preventDefault()
    console.log("trigger")
    mutation.mutate({ first_name, last_name, email, password })
    LocalStorage.saveUser({
      first_name: first_name,
      last_name: last_name,
      email: email,
    } as IUser)
    navigate("/dashboard")
  }
  function handlePageSwitch() {
    setSearchParams({ page: "login" })
  }

  //   /Content
  if (mutation.isSuccess) {
    return <span>User is created!</span>
  }

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "500px",
        gap: "15px",
      }}
      onSubmit={submitData}>
      <FormControl
        isRequired
        isInvalid={!validateName("first_name")}>
        <FormLabel>First name</FormLabel>
        <Input
          type="text"
          id="firstName"
          focusBorderColor="#b4b1b0"
          placeholder="Enter your first name"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {!validateName("first_name") && (
          <FormErrorMessage>Please enter your name</FormErrorMessage>
        )}
      </FormControl>
      <Input
        type="text"
        id="secondName"
        focusBorderColor="#b4b1b0"
        placeholder="Enter your last name"
        value={last_name}
        onChange={(e) => setLastName(e.target.value)}
      />
      <Input
        type="email"
        id="email"
        focusBorderColor="#b4b1b0"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormControl
        isRequired
        isInvalid={!validateName("first_name")}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            focusBorderColor="#b4b1b0"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => setShow((p) => (p = !p))}>
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        {!validatePassword() && (
          <FormErrorMessage>Please enter your password</FormErrorMessage>
        )}
      </FormControl>
      <Input
        type="password"
        id="repeatPassword"
        focusBorderColor="#b4b1b0"
        placeholder="Repeat your password"
        value={repeatPassword}
        onChange={(e) => setRepeatedPassword(e.target.value)}
      />
      {mutation.isError ? (
        <span>Error happend</span>
      ) : (
        <Button
          type="submit"
          id="submit"
          background="#caf0f8"
          color="#4f6b7c"
          isLoading={mutation.isLoading}
          isDisabled={!isFormValid}
          fontSize="25px">
          Register
        </Button>
      )}

      <Button
        onClick={handlePageSwitch}
        style={{
          color: "#4f6b7c",
          fontFamily: "cursive",
          fontSize: "20px",
        }}>
        Already have an account
      </Button>
    </form>
  )
}

// display="flex"
// flexDirection="column"
// alignItems="center"
// justifyContent="center"
// gap={15}
// w="100%"
// padding="10px"
// color="black"
// background="#f5f2fe"
// boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
// borderRadius="10px"
