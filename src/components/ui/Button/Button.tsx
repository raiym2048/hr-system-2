import {classNames, Mods} from '../../../utils/lib/classNames/classNames';
import {ButtonHTMLAttributes, CSSProperties, FC, ReactNode, useMemo} from 'react';
import cls from './Button.module.scss';

export enum ButtonTheme {
    BLUE_BTN = 'blue_btn',
    GRAY_BTN = 'gray_btn',
    CLEAR_BTN = 'clear_btn',
    CLEAR = 'clear',
    BTN_STATUS_CLOSE = 'btn_close',
    BTN_STATUS_OPEN = 'btn_open',
    BTN_STATUS_ARCHIVE = 'btn_archive',
    SQUARE = 'square_btn'
}

export enum ButtonSize {
    SIZE_BTN_MEDIUM = 'size_button_medium',
    DEFAULT_SIZE = 'default_size',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string,
    theme?: ButtonTheme,
    size?: ButtonSize,
    disabled?: boolean,
    children?: ReactNode,
    color?: string,
    padding?:string

}

export const Button: FC<ButtonProps> = (props) => {
    const {
        className,
        children,
        theme,
        size,
        color,
        disabled = false,
        padding,
        ...otherProps
    } = props;


    const mods: Mods = {
        [cls[theme || '']]: true,
        [cls[size || '']]: true,
        [cls.disabled]: disabled,
    };


    const styles = useMemo<CSSProperties>(() => ({
        border: '1px solid ' + color,
        color: color,
        padding:padding
    }), [color]);

    return (
        <button
            type={'button'}
            className={classNames(cls.Button, mods, [className || ''])}
            {...otherProps}
            style={styles}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
