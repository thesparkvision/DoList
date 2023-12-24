import { Box, Flex, Link, Image } from "@chakra-ui/react";
import DoListLogo from "../assets/doListLogo.svg"
import "./Header.scss"

function Header() {
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
                <Link href="/">
                    <Image 
                        src={DoListLogo} 
                        alt="Logo" 
                        width="3.5rem" 
                        height="2.5rem"
                    />
                </Link>
            </Box>
            
            <Box>
                <Link mx="2" href="/" color="gold">Home</Link>
            </Box>
        </Flex>
    );
}

export default Header;