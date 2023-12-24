import {ReactNode} from "react"

export interface ChildrenProps {
    children: ReactNode;
}

export type ButtonInteractionEvent = React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>;