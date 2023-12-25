import React, { useState } from "react";
import { Box, Button, Input, Text, FormLabel, FormControl, Card, Tooltip, Spinner } from "@chakra-ui/react"
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
    const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault()

        setIsSubmitBtnDisabled(true)

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
                title: "Account Created Successfully! Redirecting to login page..."
            })

            setTimeout(() => {
                navigate('/auth/login')
            }, 2000);

        }).catch((error) => {
            failedNotification({
                title: "Something went wrong with account creation!",
                description: error?.detail
            })
        }).finally(() => {
            setIsSubmitBtnDisabled(false)
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

                    <Tooltip label="API call is going on" isDisabled={!isSubmitBtnDisabled}>
                        <Button
                            id="submitBtn"
                            type="submit"
                            colorScheme='teal'
                            isDisabled={isSubmitBtnDisabled}
                        >
                            Submit &nbsp; {isSubmitBtnDisabled && <Spinner />}
                        </Button>
                    </Tooltip>
                </form>
            </Card>
        </Box>
    )
}

export default SignupPage;