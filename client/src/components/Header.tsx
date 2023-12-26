import { Box, Flex, Link, Image, Stack } from "@chakra-ui/react";
import DoListLogo from "../assets/doListLogo.svg"
import useAppContext from "../hooks/useAppContext";
import { utilityNotification } from "../lib/Utils";
import { FRONTEND_PAGE_URLS } from "../lib/Constants";
import "./Header.scss"

function Header() {
    const {authentication} = useAppContext()
    const [isAuthenticated, setAuthenticated] = authentication || {};

    const handleLogout = () => {
        utilityNotification({
            title: "Logging Out...",
            position: 'top'
        })

        setTimeout(() => {
            localStorage.removeItem("API_TOKEN")
            setAuthenticated(false)
            window.location.reload()
        }, 2000);
    }

    return (
        <Flex 
            as="nav" 
            align="center" 
            justify="space-between" 
            p="2" 
            aria-label="Site Header" 
            id="header"
        >
            <Box>
                <Link href={FRONTEND_PAGE_URLS.HOME_PAGE}>
                    <Image 
                        src={DoListLogo} 
                        alt="Logo" 
                        width="3.5rem" 
                        height="2.5rem"
                    />
                </Link>
            </Box>
            
            <Stack flexDirection={"row"}>
                <Link mx="2" href={FRONTEND_PAGE_URLS.HOME_PAGE} color="gold">Home</Link>
                
                {!isAuthenticated && (
                    <>
                        <Link mx="2" href={FRONTEND_PAGE_URLS.SIGNUP_PAGE} color="gold">Signup</Link>
                        <Link mx="2" href={FRONTEND_PAGE_URLS.LOGIN_PAGE} color="gold">Login</Link>    
                    </>
                )}
                
                {isAuthenticated && (
                    <>
                        <Link mx="/" onClick={handleLogout} href="#" color="#ff3b3b">Logout</Link>      
                    </>
                )}
            </Stack>
        </Flex>
    );
}

export default Header;