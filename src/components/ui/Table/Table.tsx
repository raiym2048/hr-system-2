import cls from './Table.module.scss'
import {classNames} from "../../../utils/lib/classNames/classNames";
import {useEffect, useState} from "react";
import {Text, TextStyle} from "../Text/Text";
import {MdOutlineModeEditOutline, MdOutlineVisibility} from "react-icons/md";
import {BiBlock} from "react-icons/bi";
import {AiFillDelete} from "react-icons/ai"
import {IAdminUser} from "../../../pages/Admin/type/adminSchema";
import {useAppDispatch} from "../../../redux/store/store";
import {saveSelectedUserIds} from "../../../pages/Admin/slices/adminSlice";

interface TableProps {
    data: IAdminUser[];
    columns: string[];
}

const Table = (props: TableProps) => {

    const {
        data,
        columns
    } = props
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const dispatch=useAppDispatch()

    useEffect(()=>{
        dispatch(saveSelectedUserIds(selectedRows))
    },[selectedRows])

    const toggleSelectAll = () => {
        if (selectAll) {
            setSelectedRows([]);
        } else {
            const allUserIds = data.map((item) => item.userId);
            setSelectedRows(allUserIds);
        }
        setSelectAll(!selectAll);

    };

    const handleCheckboxChange = (userId: number) => {
        setSelectedRows((prevSelectedRows) => {
            if (prevSelectedRows.includes(userId)) {
                return prevSelectedRows.filter((id) => id !== userId);
            } else {
                return [...prevSelectedRows, userId];
            }
        });
    };
    return (
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
                        <th>{rowIndex+1}</th>
                        <th>
                            <input
                                type={"checkbox"}
                                checked={selectedRows.includes(item.userId)}
                                onChange={() => handleCheckboxChange(item.userId)}
                            />
                        </th>
                        <th>{item.userName}</th>
                        <th>{item.userRole==='JOB_SEEKER'?'Соискатель':'Работодатель'}</th>
                        <th>{item.userEmail}</th>
                        <th>{item.lastVisit}</th>
                        <th className={cls.table_icons}>
                            <span><MdOutlineVisibility/></span>
                            <span><MdOutlineModeEditOutline/></span>
                            <span><BiBlock/></span>
                            <span><AiFillDelete color={'rgba(222, 95, 95, 1)'}/></span>
                        </th>
                    </tr>
                )
            })}
            </tbody>
        </table>
    );
};

export default Table;
