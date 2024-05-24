import {classNames} from "../../../utils/lib/classNames/classNames";
import cls from './Input.module.scss'
import React, {InputHTMLAttributes, useState} from "react";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>


interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    validate?: (value: string) => boolean;
}

const Input = (props: InputProps) => {
    const {
        className,
        value,
        onChange,
        validate,
        placeholder,
        type = 'text',
    } = props

    const [isValid, setIsValid] = useState(true);
    const [error, setError] = useState('');

    const validateInput = (inputValue: string) => {
        if (validate) {
            let isValidInput = true;
            let errorMessage = '';
            if (type === 'email') {
                isValidInput = validate(inputValue);
                errorMessage = 'Неправильный формат адрес электронной почты';
            } else if (type === 'phoneNumber') {
                isValidInput = validate(inputValue);
                errorMessage = 'Неправильный формат номер телефона';
            } else if (type === 'name') {
                isValidInput = validate(inputValue);
                errorMessage = 'Пишите имя';
            } else if (type == 'massage') {
                isValidInput = validate(inputValue);
                errorMessage = 'Слишком много символы';
            }
            setIsValid(isValidInput);
            setError(isValidInput ? '' : errorMessage);
            return isValidInput;
        }

    };


    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        validateInput(inputValue)
        onChange?.(inputValue);
    }


    return (
        <div className={classNames(cls.Input, {isValid: !isValid}, [className || ''])}>
            <input
                type={type}
                value={value}
                onChange={onChangeHandler}
                placeholder={placeholder}
                className={cls.input}
            />
            {error && <p className={cls.error_message}>{error}</p>}
        </div>
    );
};

export default Input;
