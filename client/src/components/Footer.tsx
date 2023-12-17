import { Flex, Text } from "@chakra-ui/react";
import "./Footer.scss"

function Footer() {
    return (
        <Flex 
            as="nav" 
            justifyContent="center" 
            p="1" 
            aria-label="Site Footer" 
            id="footer"
        >
            <Text fontSize="sm" fontWeight="bold">Built with ❤️ by Aman</Text>
        </Flex>
    );
}

export default Footer;