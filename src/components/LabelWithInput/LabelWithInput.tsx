import {ChangeEvent} from "react";
import './style.scss'

type Props = {
    label: string
    inputValue: string
    isInputInvalid: boolean
    setNumberValue: (value: string) => void
}

export const LabelWithInput = (
    {
        label,
        inputValue,
        isInputInvalid,
        setNumberValue,
    }: Props) => {

    const setInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const currentInputValue = e.currentTarget.value

            if (!isNaN(+currentInputValue)) {
            setNumberValue(parseInt(currentInputValue, 10).toString());
        }
    }

    const setDefaultInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value === '') {
            setNumberValue('0')
        }
    }

    return (
        <div className={'LabelWithInput'}>
            <span>{label}: </span>
            <input
                type="number"
                value={inputValue}
                className={isInputInvalid ? 'invalid' : ''}
                onChange={setInputValueHandler}
                onBlur={setDefaultInputValueHandler}/>
        </div>
    )
}