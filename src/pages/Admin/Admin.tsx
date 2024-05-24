
import {classNames} from "../../utils/lib/classNames/classNames";
import cls from './Admin.module.scss'
import {Outlet, useNavigate} from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar/Sidebar";
import {useAppSelector} from "../../redux/store/store";
import {useEffect} from "react";
const Admin = ( ) => {
    const navigate = useNavigate();
    const auth = useAppSelector((state) => state.authSlice);
    useEffect(() => {
        if (!auth && auth) {
            navigate("/registration");
        }
    });
    return (
        <div className="main">
            <div className={'container'}>
                <div className={classNames(cls.Admin,{},[])}>
                    <div className={cls.admin_sidebar}>
                        <Sidebar/>
                    </div>
                    <div className={cls.admin_content}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Admin;
