
import cls from './RequestTable.module.scss'
import {Text, TextStyle} from "../../../../components/ui/Text/Text";
import {classNames} from "../../../../utils/lib/classNames/classNames";
import {IAdminSupport} from "../../type/adminSchema";
import {AiFillDelete} from "react-icons/ai";
import {baseUrl} from "../../../../services/commonVariables";
import {useAppDispatch} from "../../../../redux/store/store";
import {fetchAdminSupport} from "../../services/fetchAdminUser";


interface RequestTableProps {
    data:IAdminSupport[] ;
    columns: string[];
    сounter?: number
}
const RequestTable = (props:RequestTableProps ) => {
    const {
        data,
        columns,
        сounter = 0,
    } = props
const dispatch=useAppDispatch()
    const remove=(id:number)=>{
        fetch(`${baseUrl}/admin/delete/support/${id}`, {
            method: 'DELETE'
        }).then(() => {
           dispatch(fetchAdminSupport())
        }).catch(err => {
            console.error(err)
        });
    }
    return (
        <>
                <table className={classNames(cls.table, {}, [])}>
                    <thead className={cls.tableHeader}>
                    <tr>
                        <th><Text text={'№'} style={TextStyle.TEXT_JOB_SEEKER_VACANCY} className={cls.text}/></th>

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
                                <td>{item.personName}</td>
                                <td>{item.personEmail}</td>
                                <td>{item.personPhoneNumber}</td>
                                <td>{item.massage}</td>
                                <td>{item.dateSent}</td>
                                <th className={cls.table_icons}>
                            <span onClick={()=>remove(item.id)}>
                                <AiFillDelete color={'rgba(222, 95, 95, 1)'}/>
                            </span>
                                </th>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                {/*{isDeleteModalVisible && (*/}
                {/*    <div className={cls.modal}>*/}
                {/*        <div className={cls.modalContent}>*/}
                {/*            <h3 className={cls.modalContent__text}>Удалить выбранных пользователей</h3>*/}
                {/*            <p className={cls.modalContent__title}>Вы уверены, что хотите удалить выбранных*/}
                {/*                пользователей?</p>*/}
                {/*            <div className={cls.modalContent__btns}>*/}
                {/*                <Button*/}
                {/*                    className={cls.modalBtnDelete}*/}
                {/*                    // onClick={handleDeleteConfirmation}*/}
                {/*                    theme={ButtonTheme.CLEAR_BTN}*/}
                {/*                >*/}
                {/*                    Удалить*/}
                {/*                </Button>*/}
                {/*                <Button*/}
                {/*                    className={cls.modalBtn}*/}
                {/*                    // onClick={handleDeleteCancel}*/}
                {/*                >*/}
                {/*                    Отмена*/}
                {/*                </Button>*/}
                {/*            </div>*/}

                {/*        </div>*/}
                {/*    </div>*/}
                {/*)}*/}
            </>
    );
};

export default RequestTable;
