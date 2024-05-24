import {classNames, Mods} from '../../../utils/lib/classNames/classNames';
import cls from './Text.module.scss';
import {CSSProperties, useMemo} from "react";

export enum TextStyle {
    TEXT_JOB_SEEKER_VACANCY = 'text_job-seeker_vacancy',
    TASK_NAME_JOB = 'task_name_job',
    MAIN_TITLE = 'main_title',
    CATEGORY_TEXT = 'category_text',
    CENTER_TEXT='center_text'
}

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    style?: TextStyle;
    list?: string[];
    onClick?:()=>void;
    width?:number
}

export const Text = (props: TextProps) => {
    const {
        className,
        text,
        title,
        style = '',
        list,
        width,
        onClick
    } = props;

    const styles = useMemo<CSSProperties>(() => ({
        width: width,
    }), [width]);

    const mods: Mods = {
        [cls[style]]: true,
    };

    return (
        <div  className={classNames(cls.Text, mods, [className || ''])}
        style={styles}
        >
            {text && <p className={cls.text}>{text}</p>}
            {title && <p onClick={onClick} className={cls.title}>{title}</p>}
            {list && <ul className={cls.list}>{
                list.map((item, index) => {
                    return <li key={index} className={cls.list_item}>{item}</li>
                })
            }</ul>
            }
        </div>
    );
};
