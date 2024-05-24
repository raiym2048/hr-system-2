// import { useNavigate } from "react-router-dom";
import "./ChoiceUser.scss";
// import { useAppDispatch } from "../../../redux/store/store";

// import { Button } from "../../../components/ui/Button/Button";

function ChoiceUser() {
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  // const employerClick = () => {
  //   dispatch(setEmployer(true));
  //   navigate("/registration");
  // };

  // const applicantClick = () => {
  //   dispatch(setEmployer(false));
  //   navigate("/registration");
  // };
  return (
    <div className="choiceUser">
      <div className="choiceBtn">
        {/* <Button className={"btn"} onClick={() => employerClick()}>
          Я соискатель
        </Button>
        <Button className={"btn"} onClick={() => applicantClick()}>
          Я работодатель
        </Button> */}
      </div>
    </div>
  );
}

export default ChoiceUser;
