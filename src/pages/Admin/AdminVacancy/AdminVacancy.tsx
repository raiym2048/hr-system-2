import cls from './AdminVacancy.module.scss'
import {classNames} from "../../../utils/lib/classNames/classNames";
import {AiFillDelete, AiOutlineSearch} from "react-icons/ai";
import Input from "../../../components/ui/Input/Input";
import {Select} from "../../../components/ui/Select/Select";
import VacancyTable from "./VacancyTable/VacancyTable";
import {useAppDispatch, useAppSelector} from "../../../redux/store/store";
import {fetchAdminVacancy, fetchAdminVacancyDelete} from "../services/fetchAdminUser";
import {useEffect, useState} from "react";
import Pagination from "../../../components/ui/Pagination/Pagination";
import {Button, ButtonTheme} from "../../../components/ui/Button/Button";
import Loader from "../../../components/ui/Loader/Loader";
import {saveSelectedUserIds} from "../slices/adminSlice";


interface AdminVacancyProps {
    className?: string;
}

const AdminVacancy = ({className}: AdminVacancyProps) => {

    const dispatch = useAppDispatch()
    const [vacancyName, setVacancyName] = useState<string>('')
    const [date, setDate] = useState<string>('')
    const {admin_vacancy, isLoading, allVacancyIds} = useAppSelector(state => state.admin)
    const search: Record<string, string> = {
        vacancyName,
        date
    }

    const resetSelection = () => {
        setVacancyName('')
        setDate('')
        dispatch(saveSelectedUserIds([]))
    };

    const [currentPage, setCurrentPage] = useState(1);
    const totalItems: number = admin_vacancy.length;
    const itemsPerPage = 9


    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedItems = admin_vacancy.slice(startIndex, endIndex);
    const userCounter = startIndex + 1;


    useEffect(() => {
        dispatch(fetchAdminVacancy(search))
    }, [vacancyName, date])

    const deleteAdminUser = () => {
        dispatch(fetchAdminVacancyDelete(allVacancyIds))
    }

    return (
        <div className={classNames(cls.AdminVacancy, {}, [className])}>

            <div className={cls.admin_vacancy__header}>
                <div className={cls.admin_vacancy__search}>
                    <AiOutlineSearch size={20}/>
                    <Input
                        type={'text'}
                        placeholder={'Поиск'}
                        className={cls.admin_vacancy__input}
                        value={vacancyName}
                        onChange={(value: string) => setVacancyName(value)}
                    />
                </div>
                <div>
                    <Select options={
                        [
                            {
                                label: 'Сегодня',
                                value: 'TODAY'
                            },
                            {
                                label: 'На этой неделе',
                                value: 'THIS_WEEK'

                            },
                            {
                                label: 'В этом месяце',
                                value: 'THIS_MONTH'
                            },
                            {
                                label: 'Этот год',
                                value: 'THIS_YEAR'
                            },
                        ]
                    }
                            value={date}
                            onChange={(value: string) => setDate(value)}
                            placeholder={'По дате создания'}
                            className={cls.admin_vacancy__select}
                    />
                </div>
                <div className={cls.admin_vacancy__btns}>
                    {
                        allVacancyIds.length > 0 ? (
                            <>
                                <Button
                                    theme={ButtonTheme.SQUARE}
                                    className={cls.admin_vacancy__btn}
                                    onClick={deleteAdminUser}
                                >
                                    Удалить выбранное
                                    <span>
                            <AiFillDelete
                                color={'rgba(222, 95, 95, 1)'}
                                style={{marginLeft: '10px', display: 'flex', alignItems: 'center'}}
                            />
                                    </span>
                                </Button>
                                <Button
                                    theme={ButtonTheme.SQUARE}
                                    className={cls.admin_vacancy__btnreset}
                                    onClick={resetSelection}
                                >
                                    Сбросить
                                </Button>
                            </>
                        ) : ''
                    }

                </div>
            </div>
            {
                isLoading ? (<Loader size={"large"}/>) : (<VacancyTable data={displayedItems} counter={userCounter}
                                                                        columns={['компания', 'позиция', 'Дата создания', 'Действия']}/>)
            }
            <Pagination currentPage={currentPage}
                        totalPages={Math.ceil(totalItems / itemsPerPage)}
                        onPageChange={handlePageChange}
            />
        </div>
    );
};

export default AdminVacancy;

