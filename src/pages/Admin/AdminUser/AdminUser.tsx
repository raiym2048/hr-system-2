import cls from './AdminUser.module.scss'
import {classNames} from "../../../utils/lib/classNames/classNames";
import {Select} from "../../../components/ui/Select/Select";
import {AiFillDelete, AiOutlineSearch} from "react-icons/ai";
import Input from "../../../components/ui/Input/Input";
import {useEffect, useState} from "react";
import {Button, ButtonTheme} from "../../../components/ui/Button/Button";
import {useAppDispatch, useAppSelector} from "../../../redux/store/store";
import {fetchAdminUser, fetchAdminUserDelete} from "../services/fetchAdminUser";
import UserTable from "./UserTable/UserTable";
import Loader from "../../../components/ui/Loader/Loader";
import Pagination from "../../../components/ui/Pagination/Pagination";
import {saveSelectedUserIds} from "../slices/adminSlice";


interface AdminUserProps {
    className?: string;
}

const AdminUser = ({className}: AdminUserProps) => {
    const [name, setName] = useState<string>('')
    const [role, setRole] = useState<string>('')

    const dispatch = useAppDispatch()
    const {admin_user, selectedUserIds, isLoading} = useAppSelector(state => state.admin)
    const search: Record<string, string> = {
        name,
        role
    }
    const [currentPage, setCurrentPage] = useState(1);
    const totalItems: number = admin_user.length;
    const itemsPerPage = 9


    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedItems = admin_user.slice(startIndex, endIndex);
    const userCounter = startIndex + 1;

    const deleteAdminUser = () => {
        dispatch(fetchAdminUserDelete(selectedUserIds))
    }

    const resetSelection = () => {
        setName('')
        setRole('')
        dispatch(saveSelectedUserIds([]))
    };
    useEffect(() => {
        dispatch(fetchAdminUser(search))
    }, [name, role])
    return (
        <div className={classNames(cls.AdminUser, {}, [className])}>
            <div className={cls.admin_user__header}>
                <div className={cls.admin_user__search}>
                    <AiOutlineSearch size={20}/>
                    <Input
                        type={'text'}
                        placeholder={'Поиск'}
                        className={cls.admin_user__input}
                        value={name}
                        onChange={(value:string)=>setName(value)}
                    />
                </div>
                <div>
                    <Select options={
                        [
                            {
                                label: 'Соискатель',
                                value: 'JOB_SEEKER'
                            },
                            {
                                label: 'Работодатель',
                                value: 'EMPLOYER'
                            }
                        ]
                    }
                            value={role}
                            onChange={(value: string) => setRole(value)}
                            placeholder={'Роль'}
                            className={cls.admin_user__select}
                    />
                </div>
                <div className={cls.admin_user__btns}>
                    {
                        selectedUserIds.length>0? (
                            <>
                                <Button
                                    theme={ButtonTheme.SQUARE}
                                    className={cls.admin_user__btn}
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
                                    className={cls.admin_user__btnreset}
                                    onClick={resetSelection}
                                >
                                    Сбросить
                                </Button>
                            </>
                        ):''
                    }
                </div>

            </div>
            {
                isLoading ? (<Loader size={"large"}/>) : (
                    <UserTable
                        data={displayedItems}
                        columns={['ФИО/Наименование компании', 'роль', 'электронная почта', 'последний Визит', 'Действия']}
                        сounter={userCounter}
                    />)
            }
            <Pagination currentPage={currentPage}
                        totalPages={Math.ceil(totalItems / itemsPerPage)}
                        onPageChange={(page:number)=>setCurrentPage(page)}
            />

        </div>
    );
};

export default AdminUser;
