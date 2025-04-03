import {ReactNode} from "react";
import './style.scss'

type Props = {
    children: ReactNode
}

export const Box = ({children}:Props) => {
    return (
        <div className={'box'}>
            {children}
        </div>
    )
}