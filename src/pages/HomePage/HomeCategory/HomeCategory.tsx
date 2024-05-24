import {classNames} from "../../../utils/lib/classNames/classNames";
import cls from './HomeCategory.module.scss'
import {Avatar} from "../../../components/ui/Avatar/Avatar";
import work from '../../../utils/assets/work.png'
import {IVacancy} from "../../JobSeekerVacancyPage/type/jobSeekerVacansySchema";


interface CategoryTableProps {
    className?: string;
    date?:IVacancy
}

const HomeCategory = ({className,date}: CategoryTableProps) => {

    return (
        <div className={classNames(cls.CategoryTable, {}, [className || ''])}>
            <Avatar
                src={date?.image?.path}
                size={62}
            />

            <div className={cls.company}>
                <span className={cls.title}>компания</span>
                <p className={cls.text}>{date?.companyName}</p>
                <div className={cls.location}>
                    <img src={work}/>
                    <span>{`${date?.country}, ${date?.city}`}</span>
                </div>
            </div>

            <div className={cls.company}>
                <span className={cls.title}>Должность</span>
                <p className={cls.text}>{date?.position}</p>
                <div className={cls.location}>
                    <img src={work}/>
                    <span>{date?.industry}</span>
                </div>
            </div>

            <div className={cls.company}>
                <span className={cls.title}>оклад</span>
                <p className={cls.text}>{`${date?.salaryResponse?.salarySum} ${date?.salaryResponse?.valute}`}</p>
                <div className={cls.location}>
                    <img src={work}/>
                    <span>{date?.typeOfEmploymentS}</span>
                </div>
            </div>

            <div className={cls.company}>
                <span className={cls.title}>Опыт работы</span>
                <p className={cls.text}>{date?.requiredExperience}</p>
                <div className={cls.location}>
                    <img src={work}/>
                    <span>{`${date?.country}, ${date?.city}`}</span>
                </div>
            </div>
        </div>
    );
};

export default HomeCategory;
