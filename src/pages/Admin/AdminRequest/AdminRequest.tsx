import cls from './AdminRequest.module.scss'
import {classNames} from "../../../utils/lib/classNames/classNames";
import RequestTable from "./RequestTable/RequestTable";
import {useAppDispatch, useAppSelector} from "../../../redux/store/store";
import {useEffect, useState} from "react";
import {fetchAdminSupport} from "../services/fetchAdminUser";
import Pagination from "../../../components/ui/Pagination/Pagination";
import {IAdminSupport} from "../type/adminSchema";


interface AdminRequestProps {
    className?: string;
}

const AdminRequest = ({className}: AdminRequestProps) => {

    const dispatch = useAppDispatch()
    const adminSupport:IAdminSupport[]= useAppSelector(state => state.admin.adminSupport)

    const [currentPage, setCurrentPage] = useState(1);
    const totalItems: number = adminSupport.length;
    const itemsPerPage = 9
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedItems = adminSupport.slice(startIndex, endIndex);
    const userCounter = startIndex + 1;
    useEffect(()=>{
        dispatch(fetchAdminSupport())
    },[])
    return (
        <div className={classNames(cls.AdminRequest, {}, [className])}>
            <h3 className={cls.admin_request__text}>Запросы на поддержку</h3>
            <RequestTable
                data={displayedItems}
                columns={['Имя', 'E-mail', 'телефон', 'Сообщение', 'Дата отправки', 'Действия']}
                 сounter={userCounter}
            />
            <Pagination currentPage={currentPage}
                        totalPages={Math.ceil(totalItems / itemsPerPage)}
                        onPageChange={(page:number)=>setCurrentPage(page)}
            />
        </div>
    );
};

export default AdminRequest;
