import { Flex, Text } from "@chakra-ui/react";
import "./Footer.scss"

function Footer() {
    return (
        <Flex as="nav" justifyContent={"center"} p="4" aria-label="Site Footer" id="footer">
            <Text fontSize="xl" fontWeight="bold">Made with ❤️ by Aman</Text>
        </Flex>
    );
}

export default Footer;