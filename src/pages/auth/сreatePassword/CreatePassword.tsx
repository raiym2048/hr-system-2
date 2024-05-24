import { useState } from "react";
import "./CreatePassword.scss";
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../../../components/ui/Button/Button";

function CreatePassword() {
  const [password, setPassword] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [hide, setHide] = useState(false);
  const [hideTwo, setHideTwo] = useState(false);

  return (
    <div className="createPassword">
      <h2>Создайте пароль</h2>
      <div className="createPasswordInput">
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={hide ? "text" : "password"}
          placeholder="Новый пароль"
        />
        <div className="iconHide">
          {hide ? (
            <span className="spanIconHide" onClick={() => setHide(!hide)}>
              <BiShow />
            </span>
          ) : (
            <span className="spanIconHide" onClick={() => setHide(!hide)}>
              <BiHide />
            </span>
          )}
        </div>
        <input
          value={passwordTwo}
          onChange={(e) => setPasswordTwo(e.target.value)}
          type={hideTwo ? "text" : "password"}
          placeholder="Повторите пароль"
        />
        <div className="iconHideTwo">
          {hideTwo ? (
            <span
              className="spanIconHideTwo"
              onClick={() => setHideTwo(!hideTwo)}
            >
              <BiShow />
            </span>
          ) : (
            <span
              className="spanIconHideTwo"
              onClick={() => setHideTwo(!hideTwo)}
            >
              <BiHide />
            </span>
          )}
        </div>
      </div>
      <div className="textBtn">
        <div className="createPasswordBtn">
          <Button className="btn">Создать аккаунт</Button>
          <div className="createPasswordBtnGoogle">
            <span className="createPasswordBtnIcon">
              <FcGoogle />
            </span>
            <Button className="btnG">Продолжить с Google</Button>
          </div>
        </div>
        <div className="comeText">
          <span >
            У вас уже есть аккаунт?<b>Войти</b>
          </span>
        </div>
      </div>
    </div>
  );
}

export default CreatePassword;
