import { useNavigate } from "react-router";
import { Button } from "../../../components/ui/Button/Button";
import "./ForgotPasswordPage.scss";
import { FcGoogle } from "react-icons/fc";
// import { useAppDispatch } from "../../../redux/store/store";

// import { useState } from "react";
// import registerService from "../../../services.tsx/registration";

function ForgotPasswordPage() {
  // const [emails, setEmails] = useState("");
  const navigate = useNavigate();
  const clickCome = () => {
    navigate("/login");
  };
  // const dispatch = useAppDispatch();
  // const forgot = async () => {
  //   const email = {
  //     email: emails,
  //   };
  //   try {
  //     await registerService.emailSender(email);
  //     dispatch(setEmail(emails));

  //     navigate("/createPassword");
  //   } catch (exemption) {
  //     alert("Ошибка при запросе");
  //   }
  // };
  return (
    <div className="forgotPage">
      <h2>Забыли пароль?</h2>
      <span className="textForgot">
        Пожалуйста, подтвердите свой адрес электронной почты ниже, и мы вышлем
        вам проверочный код
      </span>
      <input
        // onChange={(e) => setEmails(e.target.value)}
        className="forgotEmail"
        type="email"
        placeholder="Электронная почта"
      />
      <div className="textBtn">
        <div className="createPasswordBtn">
          {/* <Button onClick={() => forgot()} className="btn">
            Продолжить
          </Button> */}
          <div className="createPasswordBtnGoogle">
            <span className="createPasswordBtnIcon">
              <FcGoogle />
            </span>
            <Button className="btnG">Продолжить с Google</Button>
          </div>
        </div>
        <div className="comeText">
          <span>
            У вас уже есть аккаунт?<b onClick={() => clickCome()}>Войти</b>
          </span>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
