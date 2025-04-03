import './style.scss'

type Props = {
    defaultNumber?: string
    defaultMaxNumber?: string
}

export const Progress = ({defaultNumber, defaultMaxNumber}: Props) => {
    const num = Number(defaultNumber) || 0;
    const maxNum = Number(defaultMaxNumber) || 1;
    const percentages = num * (100 / maxNum)

    return (
        <progress className={'progressBar'} max="100" value={percentages} />
    )
}