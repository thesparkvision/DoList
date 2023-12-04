import { Box, Flex, Text, Link } from "@chakra-ui/react";
import "./Header.scss"

function Header() {
    return (
        <Flex as="nav" align="center" justify="space-between" p="4" aria-label="Site Header" id="header">
            <Box>
                <Text fontSize="xl" fontWeight="bold">Logo</Text>
            </Box>
            <Box>
                <Link mx="2" href="#">Home</Link>
            </Box>
        </Flex>
    );
}

export default Header;