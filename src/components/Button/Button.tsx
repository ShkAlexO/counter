type Props = {
    title: string
    disabled: boolean
    callback: () => void
}

export const Button = ({title, disabled, callback}: Props) => {
    return (
        <button onClick={callback} disabled={disabled}>
            {title}
        </button>
    )
}