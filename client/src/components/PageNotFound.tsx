import { Box, Text } from "@chakra-ui/react";
import "./PageNotFound.scss"

function PageNotFound(){
    return (
        <Box id="pageNotFound">
            <Text fontWeight={"bold"}>
                Requested Page Not Found
            </Text>
        </Box>
    )
}

export default PageNotFound;