import {classNames} from "../../../utils/lib/classNames/classNames";
import cls from './HomeVacancy.module.scss'
import {Avatar} from "../../../components/ui/Avatar/Avatar";
import work from '../../../utils/assets/work.png'
import {IVacancues} from "../../JobSeekerVacancyPage/type/jobSeekerVacansySchema";


interface CategoryTableProps {
    className?: string;
    date?: IVacancues[]
}

const HomeVacancy = ({className, date}: CategoryTableProps) => {
    return (
        <>
            {
                date && date.slice(0,3).map((item:IVacancues,key)=>{
                    return(
                        <div key={key} className={classNames(cls.CategoryTable, {}, [className || ''])}>
                            <Avatar
                                src={item.vacancyResponse?.image?.path}
                                size={62}

                            />

                            <div className={cls.company}>
                                <span className={cls.title}>компания</span>
                                <p className={cls.text}>{item?.ownerName}</p>
                                <div className={cls.location}>
                                    <img src={work}/>
                                    <span>{`${item.vacancyResponse?.country}, ${item.vacancyResponse?.city}`}</span>
                                </div>
                            </div>

                            <div className={cls.company}>
                                <span className={cls.title}>Должность</span>
                                <p className={cls.text}>{`${item?.vacancyResponse?.position &&
                                item?.vacancyResponse?.position?.length > 25 &&
                                item?.vacancyResponse?.position ? item?.vacancyResponse?.position.slice(0, 25) + "..." :
                                    item?.vacancyResponse?.position}`}</p>
                                <div className={cls.location}>
                                    <img src={work}/>
                                    <span>{item.vacancyResponse?.industry}</span>
                                </div>
                            </div>

                            <div className={cls.company}>
                                <span className={cls.title}>оклад</span>
                                <p className={cls.text}>{`${item.vacancyResponse?.salaryResponse?.salarySum} ${item.vacancyResponse?.salaryResponse?.valute}`}</p>
                                <div className={cls.location}>
                                    <img src={work}/>
                                    <span>{item.vacancyResponse?.typeOfEmploymentS}</span>
                                </div>
                            </div>

                            <div className={cls.company}>
                                <span className={cls.title}>Опыт работы</span>
                                <p className={cls.text}>{item.vacancyResponse?.requiredExperience}</p>
                                <div className={cls.location}>
                                    <img src={work}/>
                                    <span>{`${item.vacancyResponse?.country}, ${item.vacancyResponse?.city}`}</span>
                                </div>
                            </div>
                        </div>
                    )
                })

            }
        </>
    );
};

export default HomeVacancy;
