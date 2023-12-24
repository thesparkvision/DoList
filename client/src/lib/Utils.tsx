import { ToastPosition, createStandaloneToast } from "@chakra-ui/react";
const { toast } = createStandaloneToast()

type NotificationOptions = {
    title?: string;
    description?: string;
    duration?: number;
    position?: ToastPosition;
};

export const successNotification = ({
    title = '',
    description = '',
    position = 'bottom',
    duration = 5000
}: NotificationOptions): void => {

    const id: string = 'success-toast'
    if (toast.isActive(id))
        return

    toast({
        id,
        title: title,
        description: description,
        status: 'success',
        duration: duration,
        position: position,
        isClosable: true,
    })
}

export const failedNotification = ({
    title = '',
    description = '',
    position = 'bottom',
    duration = 5000
}: NotificationOptions): void => {

    const id: string = 'failure-toast'
    if (toast.isActive(id))
        return

    toast({
        id,
        title: title,
        description: description,
        status: 'error',
        duration: duration,
        position: position,
        isClosable: true,
    })
}