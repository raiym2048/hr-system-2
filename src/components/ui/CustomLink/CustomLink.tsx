import { LinkProps, NavLink} from "react-router-dom";
import cls from './CustomLink.module.scss'
import {ReactNode} from "react";
import {classNames} from "../../../utils/lib/classNames/classNames";

interface CustomLingProps extends LinkProps{
    className?: string;
    children?: ReactNode;
    activeClassName?: string;
}

const CustomLink = (props: CustomLingProps) => {
    const {
        to,
        className,
        children,
        activeClassName = '',
    } = props

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                classNames(cls.AppLink, { [activeClassName]: isActive }, [
                    className,
                ])
            }
        >
            {children}
        </NavLink>
    );
};

export default CustomLink;
