
import {classNames} from "../../../utils/lib/classNames/classNames";
import cls from './Checkbox.module.scss'


interface CheckboxProps{
    className?:string;
    label?:string;
    isChecked: boolean;
    onChange: (isChecked: boolean) => void;
}
const Checkbox = (pross:CheckboxProps ) => {
    const {
        className,
        label,
        isChecked,
        onChange
    }=pross
    const handleChange = () => {
        onChange(!isChecked)
    };
    return (
        <div className={classNames(cls.Checkbox,{},[className || ''])}>
            <label className={cls.CheckboxLabel}>
                <input className={cls.CheckboxInput} type="checkbox" checked={isChecked} onChange={handleChange} />
                {label}
            </label>
        </div>
    );
};

export default Checkbox;
