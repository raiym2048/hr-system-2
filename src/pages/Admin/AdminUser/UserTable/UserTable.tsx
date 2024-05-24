import cls from './UserTable.module.scss'
import {classNames} from "../../../../utils/lib/classNames/classNames";
import {IAdminUser} from "../../type/adminSchema";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../redux/store/store";
import {saveSelectedUserIds} from "../../slices/adminSlice";
import {Text, TextStyle} from "../../../../components/ui/Text/Text";
import {AiFillDelete} from "react-icons/ai";
import {fetchAdminUserDelete} from "../../services/fetchAdminUser";
import {useNavigate} from "react-router-dom";
import {Button, ButtonTheme} from "../../../../components/ui/Button/Button";


interface UserTableProps {
    data: IAdminUser[];
    columns: string[];
    сounter?: number
}

const UserTable = (props: UserTableProps) => {
    const {
        data,
        columns,
        сounter = 0,
    } = props

    const dispatch = useAppDispatch()
    const {admin_user, selectedUserIds} = useAppSelector(state => state.admin)

    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    //MODAL DELETE
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const handleDeleteConfirmation = () => {
        dispatch(fetchAdminUserDelete(selectedUserIds));
        setIsDeleteModalVisible(false);
    };
    const handleDeleteCancel = () => {
        setIsDeleteModalVisible(false);
    };
    //MODAL DELETE


    useEffect(() => {
        dispatch(saveSelectedUserIds(selectedRows))
    }, [selectedRows])

    const toggleSelectAll = () => {
        if (selectAll) {
            setSelectedRows([]);
        } else {
            setSelectedRows(admin_user.map((item) => item.userId));
        }
        setSelectAll(!selectAll);
    };


    const handleCheckboxChange = (userId: number) => {
        setSelectedRows((prevSelectedRows) => {
            if (prevSelectedRows.includes(userId)) {
                const newSelectedRows = prevSelectedRows.filter((id) => id !== userId);
                return newSelectedRows;
            } else {
                const newSelectedRows = [...prevSelectedRows, userId];
                return newSelectedRows;
            }
        });
    };

    const navigate = useNavigate()
    const adminUserDetail = (id:number) => {
            navigate(`/user/detail/${id}`)
    }
    if (data.length==0){
        return <p style={{fontSize:"20px"}}>нет пользователя </p>
    }


    return (
        <>
            <table className={classNames(cls.table, {}, [])}>
                <thead className={cls.tableHeader}>
                <tr>
                    <th><Text text={'№'} style={TextStyle.TEXT_JOB_SEEKER_VACANCY} className={cls.text}/></th>
                    <th className={cls.table_Checkbox}>
                        <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={toggleSelectAll}
                        />
                    </th>
                    {columns.map((column, index) => (
                            <th key={index}>
                                <Text
                                    text={column}
                                    style={TextStyle.TEXT_JOB_SEEKER_VACANCY}
                                    className={cls.text}
                                />
                            </th>
                        )
                    )}
                </tr>
                </thead>
                <tbody>
                {data.map((item, rowIndex: number) => {
                    return (
                        <tr className={cls.table_item} key={rowIndex}
                        >
                            <th>{сounter + rowIndex}</th>
                            <th>
                                <input
                                    type={"checkbox"}
                                    checked={selectedUserIds.includes(item.userId)}
                                    onChange={() => handleCheckboxChange(item.userId)}
                                />
                            </th>
                            <td onClick={() => adminUserDetail(item.userId)}>{item.userName}</td>
                            <td onClick={() => adminUserDetail(item.userId)}>{item.userRole === 'JOB_SEEKER' ? 'Соискатель' : 'Работодатель'}</td>
                            <td onClick={() => adminUserDetail(item.userId)}>{item.userEmail}</td>
                            <td onClick={() => adminUserDetail(item.userId)}>{item.lastVisit}</td>

                            <th className={cls.table_icons}>

                            <span onClick={() => {
                                if (selectedUserIds.length > 0) {
                                    setIsDeleteModalVisible(true);
                                } else {
                                    alert('Выберите пользователей для удаления');
                                }
                            }}>
                                <AiFillDelete color={'rgba(222, 95, 95, 1)'}/>
                            </span>
                            </th>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            {isDeleteModalVisible && (
                <div className={cls.modal}>
                    <div className={cls.modalContent}>
                        <h3 className={cls.modalContent__text}>Удалить выбранных пользователей</h3>
                        <p className={cls.modalContent__title}>Вы уверены, что хотите удалить выбранных
                            пользователей?</p>
                        <div className={cls.modalContent__btns}>
                            <Button
                                className={cls.modalBtnDelete}
                                onClick={handleDeleteConfirmation}
                                theme={ButtonTheme.CLEAR_BTN}
                            >
                                Удалить
                            </Button>
                            <Button
                                className={cls.modalBtn}
                                onClick={handleDeleteCancel
                                }
                            >
                                Отмена
                            </Button>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

export default UserTable;
