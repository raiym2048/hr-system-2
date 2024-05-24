import cls from './EmployersVacancies.module.scss'
import {classNames} from "../../../utils/lib/classNames/classNames";
import EmployersVacanciesCard from "./EmployersVacanciesCard/EmployersVacanciesCard";
import {useState} from "react";
import Search from "../../../components/ui/Search/Search";
import {Select} from "../../../components/ui/Select/Select";
import {Button, ButtonTheme} from "../../../components/ui/Button/Button";
import {useDounsed} from "../../../utils/hook/debounsed";
import {useAppSelector} from "../../../redux/store/store";
import {useEmployerVacanciesSearchQuery} from "../../../redux/slice/employerApi/employerVacancyApi/employerVacancyApi";
import {useNavigate} from "react-router-dom";
import Pagination from "../../../components/ui/Pagination/Pagination.tsx";


interface EmployersVacanciesProps {
    className?: string;
}

export interface ISelectValue {
    respondedCount: string,
    byDate: string,
    byStatusOfVacancy: string
}

const EmployersVacancies = ({className}: EmployersVacanciesProps) => {
    const [inputValue, setInputValue] = useState<string>('');
    const debounced = useDounsed(inputValue)
    const navigate = useNavigate()
    const user = useAppSelector((state) => state.authSlice.user);





    const [selectValue, setSelectValue] = useState<ISelectValue>({
        respondedCount: '',
        byDate: '',
        byStatusOfVacancy: ''
    })
    const resData = [
        {label: '0 - 20', value: '0 - 20'},
        {label: '21 - 50', value: '21 - 50'},
        {label: '51+', value: '51+'},
    ]
    const creData = [
        {label: 'cегодня', value: 'cегодня'},
        {label: 'На этой неделе', value: 'На этой неделе'},
        {label: 'На этой месяце', value: 'На этой месяце'},
        {label: 'В этом году', value: 'В этом году'},
    ]
    const staData = [
        {label: 'Открыто', value: 'Открыто'},
        {label: 'Архиве', value: 'Архиве'},
        {label: 'Закрыто', value: 'Закрыто'},
    ]


    const resetFilter = () => {
        setSelectValue({
            respondedCount: '',
            byDate: '',
            byStatusOfVacancy: ''
        })
    }
    const {data, isLoading} = useEmployerVacanciesSearchQuery({
            user: user.user.id,
            search: debounced,
            filterData: selectValue,
        },
        {
            refetchOnFocus: true
        }
    )


    const [currentPage, setCurrentPage] = useState(1);
    const totalItems: number  = data?data.length:0;
    const itemsPerPage = 4


    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedItems = data?data.slice(startIndex, endIndex):[];

    return (
        <div className={'container'}>
            <div className={classNames(cls.EmployersVacancies, {}, [className])}>
                <div className={cls.employersVacanciesFilter}>
                    <div className={cls.vacancy_filter__box}>
                        <Search value={inputValue} onChange={(value: string) => setInputValue(value)}/>
                        <Select
                            placeholder={'По количеству откликов'}
                            options={resData}
                            className={cls.select_bg}
                            value={selectValue.respondedCount}
                            onChange={(value: string) => setSelectValue({
                                ...selectValue, respondedCount: value
                            })}
                        />
                        <Select
                            placeholder={'По дате создания'}
                            options={creData}
                            className={cls.select_bg}

                            value={selectValue.byDate}
                            onChange={(value: string) => setSelectValue({
                                ...selectValue, byDate: value
                            })}
                        />
                        <Select
                            placeholder={'По статусу'}
                            options={staData}
                            className={cls.select_bg}

                            value={selectValue.byStatusOfVacancy}
                            onChange={(value: string) => setSelectValue({
                                ...selectValue, byStatusOfVacancy: value
                            })}
                        />
                        <Button
                            theme={ButtonTheme.SQUARE}
                            className={cls.filter_btn_reset}
                            onClick={resetFilter}
                        >
                            Сбросить
                        </Button>
                    </div>

                    <Button
                        theme={ButtonTheme.SQUARE}
                        className={cls.filter_btn}
                        onClick={() => navigate(`/employer/vacancy/form`)}
                    >
                        Создать
                    </Button>
                </div>
                <EmployersVacanciesCard myVacancy={displayedItems} isLoader={isLoading}/>
                <Pagination currentPage={currentPage}
                            totalPages={Math.ceil(totalItems / itemsPerPage)}
                            onPageChange={(page:number)=>setCurrentPage(page)}
                />

            </div>
        </div>
    );
};

export default EmployersVacancies;
