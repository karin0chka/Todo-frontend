import { Button, FormControl, Input } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from "react";
import { useMutation } from "react-query";
import { IUser } from '../../interfaces/user.interfaces';

export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const mutation = useMutation(
        (userDto: IUser) => axios.post("/auth/register", userDto),
        {
            mutationKey: "registerUser",
        }
    );


    const submitData = () => {
        mutation.mutate({ firstName, lastName, email, password });
    };

    if (mutation.isLoading) {
        return <span>Submitting...</span>;
    }

    if (mutation.isError) {
        const error = mutation.error as Error;
        return <span>Error: {error.message}</span>;
    }

    if (mutation.isSuccess) {
        return <span>User is created!</span>;
    }

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: '100vh'
        }}>
            <FormControl display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                gap={4}
                w="50%"
                h="40%"
                padding="10px"
                color="black"
                background="#e6dace"
                boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                borderRadius="10px"
                onSubmit={submitData}
            >
                <Input focusBorderColor="#b4b1b0" placeholder="Enter your first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} ></Input>
                <Input focusBorderColor="#b4b1b0" placeholder="Enter your last name" value={lastName} onChange={(e) => setLastName(e.target.value)} ></Input>
                <Input type='email' focusBorderColor="#b4b1b0" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} ></Input>
                <Input type='password' focusBorderColor="#b4b1b0" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} ></Input>
                <Button type='submit' color="black" background="#90e0ef">Register</Button>
            </FormControl >

        </div>
    )
}