import {classNames} from "../../../../../utils/lib/classNames/classNames";
import cls from './JobSeekerVacancyPage.module.scss'
import JobSeekerVacancySelector from "../JobSeekerVacancySelector/JobSeekerVacancySelector";
import JobSeekerVacancyList from "../JobSeekerVacancyList/JobSeekerVacancyList";
import {useAppSelector} from "../../../../../redux/store/store";
import Pagination from "../../../../../components/ui/Pagination/Pagination";
import {useState} from "react";
import {Text, TextStyle} from "../../../../../components/ui/Text/Text";

interface JobSeekerVacancyPageProps {
    className?: string;
}

const JobSeekerVacancyPage = ({className}: JobSeekerVacancyPageProps) => {
    const {vacancy_list} = useAppSelector(state => state.vacancyJobSeeker)
    const [currentPage, setCurrentPage] = useState(1);
    const totalItems: number = vacancy_list.length;
    const itemsPerPage = 8


    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedItems = vacancy_list.slice(startIndex, endIndex);


    return (
        <div className={'container'}>
            <div className={classNames(cls.JobSeekerVacancyPage, {}, [className || ''])}>
                <div className={cls.JobSeekerVacancyPage_selector}>
                    <JobSeekerVacancySelector/>
                </div>
                <div className={cls.JobSeekerVacancyPage_content}>
                    <div className={cls.JobSeekerVacancyPageList}>
                        {
                            displayedItems.length==0? <><Text  style={TextStyle.CENTER_TEXT}  text={`Не найдено такое вакансии`}/></>
                                : displayedItems.map((vacancy) => {
                                return <JobSeekerVacancyList key={vacancy.id} vacancy={vacancy}/>
                            })
                        }
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(totalItems / itemsPerPage)}
                        onPageChange={handlePageChange}
                    />
                </div>

            </div>
        </div>
    );
};

export default JobSeekerVacancyPage;
