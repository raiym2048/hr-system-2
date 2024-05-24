import { memo } from 'react';
import cls from './Overlay.module.scss';
import {classNames} from "../../../utils/lib/classNames/classNames.tsx";

interface OverlayProps {
    className?: string;
    onClick?: () => void;
}

export const Overlay = memo((props: OverlayProps) => {
    const { className, onClick } = props;

    return (
        <div
            onClick={onClick}
            className={classNames(cls.Overlay, {}, [className])}
        />
    );
});
