import './style.scss'

type Props = {
    isShowHint: boolean
    defaultNumber: string
    message: string
    clsTextHighlight: boolean
}

export const Table = (
    {
        isShowHint, defaultNumber, message, clsTextHighlight
    }: Props) => {

    const clsHighlight = clsTextHighlight ? 'table-text-highlight' : ''

    return (
        <div className={'table'}>
            <div className={clsHighlight}>
                {isShowHint  ? message : defaultNumber}
            </div>
        </div>
    )
}