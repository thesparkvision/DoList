import React, { useState } from "react";
import { Box, Button, Input, Flex, Text, FormLabel, FormControl, FormErrorMessage } from "@chakra-ui/react"
import { BACKEND_URLS } from "../lib/Constants";
import { failedNotification, successNotification } from "../lib/Utils";
import "./SignupPage.scss"

interface FormData {
    fullName: string;
    password: string;
    email: string;
}

interface FormErrors {
    fullName: string;
    password: string;
    email: string;
    backend: string;
}
  
const initialFormData: FormData = {
    fullName: '',
    password: '',
    email: '',
};

const initialFormErrors: FormErrors = {
    fullName: '',
    password: '',
    email: '',
    backend: ''
};

function SignupPage(){
    const [formData, setFormData] = useState<FormData>(initialFormData)
    const [formErrors, setFormErrors] = useState<FormErrors>(initialFormErrors)
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = event.target
        setFormData((prevFormData)=> ({...prevFormData, [name]: value}))
    }

    const setError = (key: string, error: string): void => {
        setFormErrors(
            (prevFormErrors) => ({...prevFormErrors, [key]: error})
        )
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
                    throw { status: response.status, errorData };
                });
            }
            successNotification("Account Created Successfully!")
        }).catch((error: any) => {
            failedNotification(error.errorData.detail)
            setError('backend', error.errorData.detail)
        })
    }

    return  (
        <Box id="signupPage">
            <Text fontSize="xl" fontWeight="bold">
                Signup
            </Text>
            <br/>
            
            <Flex id="signupBox">
                <form onSubmit={handleSubmit}>   
                    <FormControl 
                        className="formControl" 
                        isRequired
                        isInvalid={formErrors.email !== ''}
                    >
                        <FormLabel mb='8px'>Email Address: </FormLabel>
                        <Input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Enter email address here'
                            size='sm'
                            maxLength={30}
                        />
                        <FormErrorMessage>
                            {formErrors.email}
                        </FormErrorMessage>
                    </FormControl>
                    <br/>

                    <FormControl 
                        className="formControl" 
                        isRequired 
                        isInvalid={formErrors.fullName !== ''}
                    >
                        <FormLabel mb='8px'>Full Name: </FormLabel>
                        <Input
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder='Enter your full name here'
                            size='sm'
                            maxLength={60}
                        />
                        <FormErrorMessage>
                            {formErrors.fullName}
                        </FormErrorMessage>
                    </FormControl>
                    <br/>

                    <FormControl 
                        className="formControl" 
                        isRequired
                        isInvalid = {formErrors.password !== ''}
                    >
                        <FormLabel mb='8px'>Password: </FormLabel>
                        <Input
                            name="password"
                            value={formData.password}
                            type={'text'}
                            onChange={handleChange}
                            placeholder='Enter your password here'
                            size='sm'
                            minLength={6}
                            maxLength={25}
                        />
                        <FormErrorMessage>
                            {formErrors.password}
                        </FormErrorMessage>
                    </FormControl>
                    <br/>

                    <Button 
                        id="submitBtn" 
                        type="submit" 
                        colorScheme='teal'
                    >
                        Submit
                    </Button>
                    </form>
            </Flex>
        </Box>
    )
}

export default SignupPage;