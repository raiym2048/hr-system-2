import "./ConfirmationCode.scss";
import { useState } from "react";
import OtpInput from "react-otp-input";
import { Button } from "../../../components/ui/Button/Button";
// import { useAppSelector } from "../../../redux/store/store";
import registerService from "../../../services/registration";
import { useNavigate } from "react-router-dom";

function ConfirmationCode() {
  const [otp, setOtp] = useState("");
  
  const navigate = useNavigate();
  

  // const email = useAppSelector((state) => state.authSlice.emailCode);
  const handleCheck = async () => {
    const code = {
      code: otp,
    };
    try {
      await registerService.checkCode(code);
      navigate("/");
    } catch {
      alert("error");
    }
  };
  return (
    <div className="codeConfirmation">
      <div className="codeText">
        <h2>Код подтверждения </h2>
        {/* <span>
          Код отправлен на почту<b>{email}</b>
        </span> */}
      </div>

      <span className="inputCode">
        <OtpInput
          value={otp}
          onChange={setOtp}
          containerStyle="code"
          numInputs={6}
          placeholder={"0"}
          inputStyle="inputCode"
          renderInput={(props) => <input {...props} />}
        />
      </span>
      <Button onClick={() => handleCheck()} className="codeBtn">
        Подтвердить
      </Button>
    </div>
  );
}

export default ConfirmationCode;
