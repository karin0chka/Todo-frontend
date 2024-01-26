import { Button, FormControl, Input } from '@chakra-ui/react';
import { useState } from "react";
import { useMutation } from "react-query";
import { Link } from 'react-router-dom';
import api from '../utils/api';
import Footer from './Footer';
import Header from './Header';
import { LocalStorage } from '../utils/handlers';
import { IUser } from '../../interfaces/user.interfaces';
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();


    const mutation = useMutation({
        mutationFn: api.Auth.registerUser
    })


    const submitData = (e: any) => {
        e.preventDefault()
        console.log('trigger')
        mutation.mutate({ first_name, last_name, email, password })
        LocalStorage.saveUser({
            first_name: first_name,
            last_name: last_name,
            email: email
        } as IUser)
        navigate('/dashboard');
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
            minHeight: "100%",
            width: "100%",
            height: "100vh",
            overflow: "hidden",
            display: "grid",
            gridTemplateRows: "5% 90% 5%",
            color: "#4f6b7c",
        }}>
            <Header />
            <form style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: '100vh'
            }} onSubmit={submitData}>
                <FormControl display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    gap={15}
                    w="50%"
                    h="40%"
                    padding="10px"
                    color="black"
                    background="#f5f2fe"
                    boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                    borderRadius="10px"
                >
                    <Input type="text" id="firstName" focusBorderColor="#b4b1b0" placeholder="Enter your first name" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
                    <Input type="text" id="secondName" focusBorderColor="#b4b1b0" placeholder="Enter your last name" value={last_name} onChange={(e) => setLastName(e.target.value)} />
                    <Input type='email' id="email" focusBorderColor="#b4b1b0" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input type='password' id="password" focusBorderColor="#b4b1b0" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button type='submit' id="submit" background="#caf0f8" color="#4f6b7c" fontSize="25px">Register</Button>

                    <Link to="/login" style={{
                        color: "#4f6b7c",
                        fontFamily: "cursive",
                        fontSize: "20px"
                    }}>Already have an account</Link>
                </FormControl >
            </form>

            <Footer />
        </ div>

    )
}