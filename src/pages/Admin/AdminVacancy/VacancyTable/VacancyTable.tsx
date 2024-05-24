import cls from './VacancyTable.module.scss'
import {useEffect, useState} from "react";
import {AiFillDelete} from "react-icons/ai"
import {classNames} from "../../../../utils/lib/classNames/classNames";
import {useAppDispatch, useAppSelector} from "../../../../redux/store/store";
import {IAdminVacancy} from "../../type/adminSchema";
import {Text, TextStyle} from "../../../../components/ui/Text/Text";
import {fetchAdminVacancyDelete} from "../../services/fetchAdminUser";
import {saveSelectedVacancyIds} from "../../slices/adminSlice";

interface VacancyTableProps {
    data: IAdminVacancy[];
    columns: string[];
    counter?:number
}

const VacancyTable = (props: VacancyTableProps) => {

    const {
        data,
        columns,
        counter=0,
    } = props
    const {admin_vacancy,allVacancyIds}=useAppSelector(state =>state.admin)
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const dispatch=useAppDispatch()
    const toggleSelectAll = () => {
        if (selectAll) {
            setSelectedRows([]);
        } else {
            setSelectedRows(admin_vacancy.map((item) => item.vacancyId));
        }
        setSelectAll(!selectAll);
    };
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    const handleDeleteConfirmation = () => {
        dispatch(fetchAdminVacancyDelete(allVacancyIds));
        setIsDeleteModalVisible(false);
    };
    const handleDeleteCancel=()=>{
        setIsDeleteModalVisible(false);
    }

    useEffect(() => {
        dispatch(saveSelectedVacancyIds(selectedRows))
    }, [selectedRows])

    const handleCheckboxChange = (userId: number) => {
        setSelectedRows((prevSelectedRows) => {
            if (prevSelectedRows.includes(userId)) {
                return prevSelectedRows.filter((id) => id !== userId);
            } else {
                return [...prevSelectedRows, userId];
            }
        });
    };

    if (data.length==0){
        return <p style={{fontSize:"20px"}}>Нет вакансий</p>
    }

    return (
        <>
            <table className={classNames(cls.table, {}, [])}>
                <thead className={cls.tableHeader}>
                <tr>
                    <th>
                        <Text text={'№'} style={TextStyle.TEXT_JOB_SEEKER_VACANCY} className={cls.text}/></th>
                    <th className={cls.table_Checkbox}>
                        <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={toggleSelectAll}
                        />
                    </th>
                    {columns.map((column, index) => (
                            <th key={index}><Text text={column} style={TextStyle.TEXT_JOB_SEEKER_VACANCY} className={cls.text}/>
                            </th>
                        )
                    )}
                </tr>
                </thead>
                <tbody>
                {data.map((item, rowIndex:number) => {
                    return (
                        <tr className={cls.table_item} key={rowIndex}>
                            <th>{counter+rowIndex}</th>
                            <th>
                                <input
                                    type={"checkbox"}
                                    checked={selectedRows.includes(item.vacancyId)}
                                    onChange={() => handleCheckboxChange(item.vacancyId)}
                                />
                            </th>
                            <th>{item?.companyName}</th>
                            <th>{item?.position}</th>
                            <th>{item?.applicationDate}</th>
                            <th className={cls.table_icons}>
                            <span  onClick={() => {
                                if (allVacancyIds.length > 0) {
                                    setIsDeleteModalVisible(true);
                                } else {
                                    alert('Выберите пользователей для удаления');
                                }
                            }}><AiFillDelete color={'rgba(222, 95, 95, 1)'}/></span>
                            </th>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            {isDeleteModalVisible && (
                <div className={cls.modal}>
                    <div className={cls.modalContent}>
                        <p>Вы действительно хотите удалить выбранных пользователей?</p>
                        <button className={cls.modalBtn} onClick={handleDeleteConfirmation}>Да</button>
                        <button className={cls.modalBtn} onClick={handleDeleteCancel}>Нет</button>
                    </div>
                </div>
            )}
        </>


    );
};

export default VacancyTable;
