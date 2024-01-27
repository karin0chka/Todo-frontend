import { Button, FormControl, Input } from "@chakra-ui/react"
import { useState } from "react"
import { useMutation } from "react-query"
import { useNavigate, useSearchParams } from "react-router-dom"
import { IUser } from "../../interfaces/user.interfaces"
import api from "../utils/api"
import { LocalStorage } from "../utils/handlers"

export default function Register() {
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [_, setSearchParams] = useSearchParams()

  const navigate = useNavigate()

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
        alignItems: "center",
        justifyContent: "center",
        minWidth: "500px",
      }}
      onSubmit={submitData}>
      <FormControl
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={15}
        w="100%"
        padding="10px"
        color="black"
        background="#f5f2fe"
        boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        borderRadius="10px">
        <Input
          type="text"
          id="firstName"
          focusBorderColor="#b4b1b0"
          placeholder="Enter your first name"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />
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
        <Input
          type="password"
          id="password"
          focusBorderColor="#b4b1b0"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Where is repeat password + compare????? */}
        {mutation.isError ? (
          <span>Error happend</span>
        ) : (
          <Button
            type="submit"
            id="submit"
            background="#caf0f8"
            color="#4f6b7c"
            isLoading={mutation.isLoading}
            isDisabled={true}
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
      </FormControl>
    </form>
  )
}
