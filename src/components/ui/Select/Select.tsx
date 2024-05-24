import { classNames, Mods } from '../../../utils/lib/classNames/classNames';
import { ChangeEvent, memo, useMemo } from 'react';
import cls from './Select.module.scss';

export interface SelectOption {
    label: string;
    value: string;
}

interface SelectProps {
    className?: string;
    options?: SelectOption[];
    value?: string;
    onChange?: (value: string) => void;
    readonly?: boolean;
    placeholder?:string
}

export const Select = memo((props: SelectProps) => {
    const {
        className,
        options,
        onChange,
        value,
        readonly,
        placeholder
    } = props;

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    const optionsList = useMemo(() => options?.map((opt) => (
        <option
            className={cls.option}
            value={opt.value}
            key={opt.value}
        >
            {opt.label}
        </option>
    )), [options]);

    const mods: Mods = {};

    return (
        <div className={classNames(cls.Wrapper, mods, [className || ''])}>
            <select
                disabled={readonly}
                className={cls.select}
                value={value}
                onChange={onChangeHandler}
                placeholder={placeholder}
            >
                <option value="" hidden >{placeholder}</option>
                {optionsList}
            </select>
        </div>
    );
});
