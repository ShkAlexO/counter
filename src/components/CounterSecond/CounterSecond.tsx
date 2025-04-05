import {useEffect, useMemo, useState} from "react";
import {Box} from "@c/Box/Box";
import {LabelWithInput} from "@c/LabelWithInput/LabelWithInput";
import {Button} from "@c/Button/Button";
import {Table} from "@c/Table/Table";
import {Progress} from "@c/Progress/Progress";
import './style.scss'

export const CounterSecond = () => {
    const hintMessageText = "Enter values and press 'set'";
    const errorMessageText = "Incorrect value"

    const maxValue = localStorage.getItem("Max Value");
    const startValue = localStorage.getItem("Start Value");

    const [defaultNumber, setDefaultNumber] = useState<string>('0')
    const [defaultMaxNumber, setDefaultMaxNumber] = useState<string>('0')

    const [inputMaxNumber, setInputMaxNumber] = useState<string>(maxValue ? maxValue : '0')
    const [inputStartNumber, setInputStartNumber] = useState<string>(startValue ? startValue : '0')
    const [isInputMaxInvalid, setIsInputMaxInvalid] = useState<boolean>(false)
    const [isInputStartInvalid, setIsInputStartInvalid] = useState<boolean>(false)
    const [isDisabledSetButton, setIsDisabledSetButton] = useState<boolean>(true)
    const [isControlButtonsDisabled, setIsControlButtonsDisabled] = useState<boolean>(true)
    const [isShowHint, setIsShowHint] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('');
    const [clsTextHighlight, setClsTextHighlight] = useState<boolean>(false);

    const isValidInput = useMemo(() => {
        const max = +inputMaxNumber;
        const start = +inputStartNumber;
        return (
            max < 0 ||
            start < 0 ||
            max < start ||
            (max === start && max !== 0 && start !== 0)
        );
    }, [inputMaxNumber, inputStartNumber]);

    useEffect(() => {
        if (isValidInput) {
            setMessage(errorMessageText)
            setIsDisabledSetButton(true)
        } else {
            setMessage(hintMessageText)
            setIsDisabledSetButton(!(+inputMaxNumber !== 0 || +inputStartNumber !== 0))
        }

    }, [isValidInput, inputMaxNumber, inputStartNumber]);

    useEffect(() => {
        setClsTextHighlight(isValidInput || +defaultNumber === +inputMaxNumber && (+defaultNumber !== 0 && +inputMaxNumber !== 0))
    }, [isValidInput, defaultNumber, inputMaxNumber, inputStartNumber]);

    const setDefaults = () => {
        setDefaultNumber('0');
        setDefaultMaxNumber('0');
        setIsShowHint(true);
        setIsControlButtonsDisabled(true);
    };

    const setInputValidationState = (hasError: boolean) => {
        setIsInputMaxInvalid(hasError);
        setIsInputStartInvalid(hasError);
    };

    const setInputMaxNumberHandler = (value: string) => {
        setInputMaxNumber(value)
        setDefaults()

        const max = +value
        const start = +inputStartNumber

        if (max < 0 || start < 0 || max < start || (max === start && (max !== 0 && start !== 0))) {
            setInputValidationState(true)
        } else {
            setInputValidationState(false)
        }
    }

    const setInputStartNumberHandler = (value: string) => {
        setInputStartNumber(value)
        setDefaults()

        const start = +value
        const max = +inputMaxNumber

        if (start < 0 || start > max || (start === max && (start !== 0 && max !== 0))) {
            setInputValidationState(true)
        } else {
            setInputValidationState(false)
        }
    }

    const setDefaultValuesHandler = () => {
        setDefaultNumber(inputStartNumber)
        setDefaultMaxNumber(inputMaxNumber)
        setIsDisabledSetButton(true)
        setIsControlButtonsDisabled(false)
        setIsShowHint(false)
        localStorage.setItem("Max Value", inputMaxNumber)
        localStorage.setItem("Start Value", inputStartNumber)
    }

    const incNumberHandler = () => {
        if (+defaultNumber < +defaultMaxNumber) {
            setDefaultNumber((+defaultNumber + 1).toString());
        }
    }

    const resetDefaultNumberHandler = () => {
        setDefaultNumber(inputStartNumber)
        setClsTextHighlight(false)
    }

    const isDisableHandler = (curNumb: string, targetNumber: string, isControlButtonsDisabled: boolean) => {
        return (+curNumb === +targetNumber) || isControlButtonsDisabled;
    }

    return (
        <div className={'countWrap'}>
            <Box>
                <div className={'inputsInner'}>
                    <LabelWithInput
                        label={'Max Value'}
                        inputValue={inputMaxNumber}
                        isInputInvalid={isInputMaxInvalid}
                        setNumberValue={setInputMaxNumberHandler}
                    />
                    <LabelWithInput
                        label={'Start Value'}
                        inputValue={inputStartNumber}
                        isInputInvalid={isInputStartInvalid}
                        setNumberValue={setInputStartNumberHandler}
                    />
                </div>

                <div className={'buttonsInner'}>
                    <Button
                        title={'set'}
                        callback={setDefaultValuesHandler}
                        disabled={isDisabledSetButton}
                    />
                </div>
            </Box>

            <Box>
                <Table
                    isShowHint={isShowHint}
                    defaultNumber={defaultNumber}
                    message={message}
                    clsTextHighlight={clsTextHighlight}
                />
                <Progress defaultNumber={defaultNumber} defaultMaxNumber={defaultMaxNumber}/>

                <div className={'buttonsInner'}>
                    <Button
                        title={'inc'}
                        callback={incNumberHandler}
                        disabled={isDisableHandler(defaultNumber, defaultMaxNumber, isControlButtonsDisabled)}
                    />
                    <Button
                        title={'reset'}
                        callback={resetDefaultNumberHandler}
                        disabled={isDisableHandler(defaultNumber, inputStartNumber, isControlButtonsDisabled)}
                    />
                </div>
            </Box>
        </div>
    )
}