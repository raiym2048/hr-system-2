import cls from './ApplicantRespondingVacancy.module.scss'
import {classNames} from "../../../utils/lib/classNames/classNames";
import ApplicantRespondingVacancyFilter from "./ApplicantRespondingVacancyFilter/ApplicantRespondingVacancyFilter";
import ApplicantRespondingVacancyCard from "./ApplicantRespondingVacancyCard/ApplicantRespondingVacancyCard";
import Pagination from "../../../components/ui/Pagination/Pagination";
import {useAppSelector} from "../../../redux/store/store";
import {useState} from "react";



interface ApplicantRespondingVacancyProps {
    className?: string;
}

const ApplicantRespondingVacancy = ({className}: ApplicantRespondingVacancyProps) => {
    const respondingApplicantVacancy = useAppSelector((state) => state.candidatesStatus.candidatesVacancies)

    const [currentPage, setCurrentPage] = useState(1);
    const totalItems: number = respondingApplicantVacancy.length;
    const itemsPerPage = 5
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedItems = respondingApplicantVacancy.slice(startIndex, endIndex);

    return (
        <div className={'container'}>
            <div className={classNames(cls.ApplicantRespondingVacancy, {}, [className])}>
                <ApplicantRespondingVacancyFilter/>
                {
                    displayedItems.length? <ApplicantRespondingVacancyCard respondingVacancy={displayedItems} />:
                        <p>not found</p>
                }

            </div>
            <Pagination currentPage={currentPage}
                        totalPages={Math.ceil(totalItems / itemsPerPage)}
                        onPageChange={(page:number)=>setCurrentPage(page)}
            />
        </div>
    );
};

export default ApplicantRespondingVacancy;
