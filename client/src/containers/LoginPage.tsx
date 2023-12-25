import { Box, Button, Card, FormControl, FormLabel, Input, Spinner, Text, Tooltip } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { failedNotification, successNotification } from "../lib/Utils";
import { BACKEND_URLS } from "../lib/Constants";
import useAppContext from "../hooks/useAppContext";
import "./LoginPage.scss"

interface FormData {
    password: string;
    email: string;
}

const initialFormData: FormData = {
    password: '',
    email: '',
};

function LoginPage() {
    const { authentication } = useAppContext();
    const [, setAuthenticated] = authentication;
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
            "email": formData.email,
            "password": formData.password
        }

        await fetch(
            BACKEND_URLS.LOGIN_URL,
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

            return response.json()
        }).then(data => {
            if(!data.access_token)
                return

            successNotification({
                title: "Account Authenticated Successfully! Redirecting to home page...",
                duration: 5000
            })

            setTimeout(() => {
                localStorage.setItem("API_TOKEN", data.access_token)
                setAuthenticated(true)
                navigate('/')
            }, 2000);
        }).catch((error) => {
            failedNotification({
                title: "Something went wrong with user authentication!",
                description: error?.detail
            })
        }).finally(()=> {
            setIsSubmitBtnDisabled(false)
        })
    }

    return (
        <Box id="loginPage">
            <Text fontSize="xl" fontWeight="bold">
                Login
            </Text>
            <br />

            <Card id="loginBox">
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

export default LoginPage;