import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useAppSelector} from "../../redux/store/store";

const HandleApplicant = () => {
    const navigate = useNavigate();
    const auth = useAppSelector((state) => state.authSlice);
    console.log(auth)
    useEffect(() => {
        if (!auth && auth) {
            navigate("/registration");
        }
    });

    return (
        <div className="main">
            <Outlet/>
        </div>
    );
};


export default HandleApplicant
