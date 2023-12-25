import {Dispatch, ReactNode, SetStateAction} from "react"

export interface ChildrenProps {
    children: ReactNode;
}

export type ButtonInteractionEvent = React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>;

export type AppContextValue = {
    "authentication": [boolean, Dispatch<SetStateAction<boolean>>];
};