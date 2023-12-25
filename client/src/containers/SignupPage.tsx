import React, { useState } from "react";
import { Box, Button, Input, Text, FormLabel, FormControl, Card } from "@chakra-ui/react"
import { BACKEND_URLS } from "../lib/Constants";
import { failedNotification, successNotification } from "../lib/Utils";
import { useNavigate } from "react-router-dom";
import "./SignupPage.scss"

interface FormData {
    fullName: string;
    password: string;
    email: string;
}

const initialFormData: FormData = {
    fullName: '',
    password: '',
    email: '',
};

function SignupPage() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState<FormData>(initialFormData)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault()

        const requestPayload = {
            "full_name": formData.fullName,
            "email": formData.email,
            "password": formData.password
        }

        await fetch(
            BACKEND_URLS.SIGNUP_URL,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestPayload)
            }
        ).then((response) => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw { status: response.status, detail: errorData?.detail };
                });
            }

            successNotification({
                title: "Account Created Successfully! Redirecting to login page...",
                duration: 8000
            })

            setTimeout(() => {
                navigate('/auth/login')
            }, 3000);

        }).catch((error) => {
            failedNotification({
                title: "Something went wrong with account creation!",
                description: error?.detail
            })
        })
    }

    return (
        <Box id="signupPage">
            <Text fontSize="xl" fontWeight="bold">
                Signup
            </Text>
            <br />

            <Card id="signupBox">
                <form onSubmit={handleSubmit}>
                    <FormControl
                        className="formControl"
                        isRequired
                    >
                        <FormLabel mb='8px'>Email Address: </FormLabel>
                        <Input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="off"
                            placeholder='Enter email address here'
                            size='sm'
                            maxLength={30}
                        />
                    </FormControl>
                    <br />

                    <FormControl
                        className="formControl"
                        isRequired
                    >
                        <FormLabel mb='8px'>Full Name: </FormLabel>
                        <Input
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            autoComplete="off"
                            placeholder='Enter your full name here'
                            size='sm'
                            maxLength={60}
                        />
                    </FormControl>
                    <br />

                    <FormControl
                        className="formControl"
                        isRequired
                    >
                        <FormLabel mb='8px'>Password: </FormLabel>
                        <Input
                            name="password"
                            value={formData.password}
                            type={'text'}
                            onChange={handleChange}
                            autoComplete="off"
                            placeholder='Enter your password here'
                            size='sm'
                            minLength={6}
                            maxLength={25}
                        />
                    </FormControl>
                    <br />

                    <Button
                        id="submitBtn"
                        type="submit"
                        colorScheme='teal'
                    >
                        Submit
                    </Button>
                </form>
            </Card>
        </Box>
    )
}

export default SignupPage;