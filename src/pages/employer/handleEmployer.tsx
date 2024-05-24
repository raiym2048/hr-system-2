import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "../../redux/store/store";
import { Outlet } from "react-router-dom";

export const HandleEmployer = () => {
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.authSlice);

  useEffect(() => {
    if (!auth && auth) {
      navigate("/registration");
    }
  });

  return (
    <div >
      <Outlet />
    </div>
  );
};
