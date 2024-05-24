
import {classNames} from "../../../utils/lib/classNames/classNames";
import cls from './Sidebar.module.scss'
import CustomLink from "../../ui/CustomLink/CustomLink";

interface SidebarProps{
    className?:string;
}
const Sidebar = ({className}:SidebarProps ) => {
    return (
        <div className={classNames(cls.Sidebar,{},[className])}>
            <ul className={cls.link_item}>
                <li className={cls.link}> <CustomLink to={'admin/user'} children={'Пользователи'} activeClassName={cls.active} className={cls.bg_text}/> </li>
                <li className={cls.link}> <CustomLink to={'admin/vacancy'} children={'Вакансии'} activeClassName={cls.active} className={cls.bg_text} /></li>
                <li className={cls.link}> <CustomLink to={'admin/request'} children={'Запросы'} activeClassName={cls.active} className={cls.bg_text} /></li>
            </ul>
        </div>
    );
};

export default Sidebar;
