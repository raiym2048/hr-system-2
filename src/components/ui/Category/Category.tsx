import {classNames} from "../../../utils/lib/classNames/classNames";
import cls from './Category.module.scss'


interface CategoryProps {
    className?: string;
    category?: string;
    key?:number
}

const Category = (props: CategoryProps) => {

    const {
        className,
        category,
        key
    } = props

    return (
        <div key={key} className={classNames(cls.Category, {}, [className || ''])}>
            <div className={cls.avatar}>
                <img className={cls.img}/>
            </div>
            <div className={cls.text}>
                <h3>{category}</h3>
                <p>35 вакансий</p>
            </div>

        </div>


    );
};

export default Category;
