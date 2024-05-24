import {classNames} from "../../../utils/lib/classNames/classNames";
import cls from './Footer.module.scss'
import MainIcon from "../../ui/MainIcon/MainIcon";
import instagram from '../../../utils/assets/instagram.png'
import youtube from '../../../utils/assets/Youtube_black.png'
import twitter from '../../../utils/assets/twitter.png'
import facebook from '../../../utils/assets/Facebook_black.png'
import Input from "../../ui/Input/Input";
import {Button, ButtonTheme} from "../../ui/Button/Button";
import {useState} from "react";
import {baseUrl} from "../../../services/commonVariables";

interface FooterProps {
    className?: string;
}

interface IValue {
    personName: string,
    personEmail: string,
    personPhoneNumber: string,
    massage: string
}

const Footer = ({className}: FooterProps) => {
    const [valueInput, setValueInput] = useState<IValue>(
        {
            personName: "",
            personEmail: "",
            personPhoneNumber: "",
            massage: ""
        }
    )
    const [isFormValid, setIsFormValid] = useState<boolean>(true);
    const [status, setStatus] = useState<boolean>(false)

    const sendMassageToAdmin = async () => {
        setStatus(true)
        try {
            const response = await fetch(`${baseUrl}/admin/create/support`, {
                method: 'POST',
                body: JSON.stringify(valueInput),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.ok) {
                setValueInput({
                    personName: "",
                    personEmail: "",
                    personPhoneNumber: "",
                    massage: ""
                });
                setIsFormValid(!isFormValid)
            }
            return await response.json()
        } catch (error) {
            console.log(error)
        }
        finally {
           setStatus(false)
        }
    }
    const sendRequest = () => {
        sendMassageToAdmin()
    }


    function validateEmail(email: string): boolean {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailPattern.test(email);
    }

    function validateMassage(value: string, minLength: number, maxLength: number): boolean {
        return value.trim() !== '' && value.length >= minLength && value.length <= maxLength;
    }

    function validateNumbersOnly(inputValue: string): boolean {

        const numbersOnlyPattern = /^[0-9]+$/;
        return numbersOnlyPattern.test(inputValue);
    }

    const getInputValue = (inputValue: IValue) => {
        setValueInput(inputValue)
    }
    const validateInput = (inputValue: IValue) => {
        const isNameValid = validateMassage(inputValue.personName, 0, 20);
        const isEmailValid = validateEmail(inputValue.personEmail);
        const isPhoneNumberValid = validateNumbersOnly(inputValue.personPhoneNumber.toString());
        const isMessageValid = validateMassage(inputValue.massage, 1, 60);
        setIsFormValid(!(isNameValid && isEmailValid && isPhoneNumberValid && isMessageValid));
    };


    console.log(isFormValid)
    console.log(valueInput)

    return (
        <footer className={classNames(cls.Footer, {}, [className || ''])}>
            <div className={'container'}>
                <div className={cls.footer}>
                    <div className={cls.footer_content}>
                        <div className={cls.footer_child}>
                            <MainIcon/>
                        </div>
                        <div className={cls.footer_child}>
                            <h3>Контакты</h3>
                            <h4>Кыргызстан, г. Бишкек</h4>
                            <h4>ул. Токтогула 112/1</h4>
                            <h4>+996 (706) 11 22 33</h4>
                        </div>
                        <div className={cls.footer_child}>
                            <h3>Соискателям</h3>
                            <h4>Личный кабинет</h4>
                            <h4>Вакансии</h4>
                            <h4>Работодатели</h4>
                        </div>

                        <div className={cls.footer_child}>
                            <h3>Работодателям</h3>
                            <h4>Личный кабинет</h4>
                            <h4>Опубликовать вакансии</h4>
                            <h4>Кандидаты</h4>
                        </div>

                        <div className={cls.footer_child}>
                            <h3>Меню</h3>
                            <h4>Вакансии</h4>
                            <h4>FAQ</h4>
                            <h4>Контакты</h4>
                        </div>

                        <div className={cls.footer_child}>
                            <h3>Поддержка</h3>
                            <h4>Правила размещения вакансий</h4>
                            <h4>Политика конфиденциальности</h4>
                        </div>
                        <div className={cls.footer_child}>
                            <div className={cls.submit_statement}>
                                <h3>Оставить заявку</h3>
                                <Input
                                    placeholder={'Ваше имя'}
                                    type={"name"}
                                    className={cls.statement_input}
                                    value={valueInput.personName}
                                    onChange={(value) => {
                                        getInputValue({
                                            ...valueInput, personName: value
                                        });
                                        validateInput({...valueInput, personName: value});
                                    }}
                                    validate={(value) => validateMassage(value, 0, 20)}
                                />
                                <Input
                                    placeholder={'Email'}
                                    type={'email'}
                                    className={cls.statement_input}
                                    value={valueInput.personEmail}
                                    onChange={(value) => {
                                        getInputValue({
                                            ...valueInput, personEmail: value
                                        });
                                        validateInput({...valueInput, personEmail: value});
                                    }}
                                    validate={(value) => validateEmail(value)}
                                />
                                <Input
                                    placeholder={'Ваш номер телефона'}
                                    type={'phoneNumber'}
                                    className={cls.statement_input}
                                    value={valueInput.personPhoneNumber}
                                    onChange={(value) => {
                                        getInputValue({
                                            ...valueInput, personPhoneNumber: value
                                        });
                                        validateInput({...valueInput, personPhoneNumber: value});
                                    }}
                                    validate={(value) => validateNumbersOnly(value)}
                                />

                                <Input
                                    placeholder={'Сообщение'}
                                    className={cls.statement_input}
                                    type={'massage'}
                                    value={valueInput.massage}
                                    onChange={(value) => {
                                        getInputValue({
                                            ...valueInput, massage: value
                                        })
                                        validateInput({...valueInput, massage: value});

                                    }}
                                    validate={(value) => validateMassage(value, 1, 60)}
                                />
                                <div className={cls.statement_btn}>
                                    {
                                        status?"Загрузка...":
                                            <Button
                                                disabled={isFormValid}
                                                theme={ButtonTheme.BLUE_BTN}
                                                onClick={sendRequest}
                                            >
                                                Отправить
                                            </Button>
                                    }

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className={cls.footer_icons}>
                        <p>© 2023. DevsFactory. All Right Reserved.</p>
                        <div className={cls.social}>
                            <img src={instagram} alt={'icon'}/>
                            <img src={facebook} alt={'icon'}/>
                            <img src={youtube} alt={'icon'}/>
                            <img src={twitter} alt={'icon'}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cls.footer_line}>
                <hr className={cls.footer_hr}/>
            </div>
        </footer>
    );
};

export default Footer;
