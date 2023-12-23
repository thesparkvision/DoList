import { Box, Text } from "@chakra-ui/react"
import "./LandingPage.scss"

function LandingPage(){
    return  (
        <Box id="landingPage">
            <Text fontSize="xl" fontWeight="bold">Welcome to DoList - let's make your day productive!</Text>
        </Box>
    )
}

export default LandingPage;