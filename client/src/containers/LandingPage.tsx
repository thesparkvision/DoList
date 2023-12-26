import { Box, Button, Flex, Image, Stack, Text } from "@chakra-ui/react"
import landingPagePic from "../assets/landingPagePic.jpg"
import { useNavigate } from "react-router-dom";
import { FRONTEND_PAGE_URLS } from "../lib/Constants";
import "./LandingPage.scss"

function LandingPage(){
    const navigate = useNavigate()

    const goToSignupPage = (): void => {
        navigate(FRONTEND_PAGE_URLS.SIGNUP_PAGE)
    }  
    
    const goToLoginPage = (): void =>{
        navigate(FRONTEND_PAGE_URLS.LOGIN_PAGE)
    }  

    return  (
        <Box id="landingPage">
            <Text fontSize="3xl" fontWeight="bold">
                Welcome to DoList - let's make your day productive!
            </Text>
            <br/>
            
            <Stack alignItems={"center"}>
                <Image 
                    src={landingPagePic} 
                    alt="Logo" 
                    width="20rem" 
                    height="20rem"
                    fit={"cover"}
                />
            </Stack>
            <br/>

            <Flex direction={"row"} justifyContent={"center"}>
                <Button type="button" colorScheme='teal' onClick={goToSignupPage}>
                    Sign Up
                </Button> &nbsp;

                <Button type="button" onClick={goToLoginPage}>
                    Login
                </Button>
            </Flex>
            
        </Box>
    )
}

export default LandingPage;