import { createStandaloneToast } from "@chakra-ui/react";
const { toast } = createStandaloneToast()

export const successNotification = (
    title: string = '',
    description: string = ''
): void => {
    toast({
        title: title,
        description: description,
        status: 'success',
        duration: 5000,
        isClosable: true,
    })
}

export const failedNotification = (
    title: string = '',
    description: string = ''
): void => {
    toast({
        title: title,
        description: description,
        status: 'error',
        duration: 5000,
        isClosable: true,
    })
}