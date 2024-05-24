import './RegistrationPage.scss'
import { FcGoogle } from 'react-icons/fc'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '../../../components/ui/Button/Button'
import { BiHide } from 'react-icons/bi'
import { BiShow } from 'react-icons/bi'
import {
  applicantRegister,
  employerRegister, getEmployerNotification,
  getJobNotification,
} from '../../../redux/slice/authSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/store/store'

function Registration() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [hide, setHide] = useState(false)
  const [employer] = useState<boolean>()
  const [userAccount, setUserAccount] = useState(true)
  const [employerCompany, setEmployerCompany] = useState('')
  const [jobLastName, setJobLastName] = useState('')
  const [jobFirstName, setJobFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const user = useAppSelector((state) => state.authSlice.user)
  const createEmp = {
    companyName: employerCompany,
    email: email,
    password: password,
  }

  const createApplicant = {
    email: email,
    password: password,
    lastname: jobLastName,
    firstname: jobFirstName,
  }
  useEffect(() => {
    if (user === null || (Array.isArray(user) && user.length === 0)) return
    if (user.user.role === 'EMPLOYER') {
      navigate(`/employer/edit`)
      dispatch(getEmployerNotification(user.user.id))
    } else if (user.user.role === 'JOB_SEEKER') {
      dispatch(getJobNotification(user.user.id))
      navigate('/applicant/edit')
    }
  }, [user])
  const clickEmployer = (createEmp: { email: string; password: string; companyName: string }) => {
    dispatch(employerRegister(createEmp))
    dispatch(getEmployerNotification(user.user.id))
  }

  const clickApplicant = (createApplicant: {
    email: string
    password: string
    lastname: string
    firstname: string
  }) => {
    dispatch(applicantRegister(createApplicant))
    dispatch(getJobNotification(user.user.id))
  }

  const clickCome = () => {
    navigate('/login')
  }
  return (
    <div>
      <div className="registrationPage">
        <div className="registrationRole">
          <h2>Создайте аккаунт</h2>
          <span>Выберите роль:</span>
        </div>
        <div className="registrationRoleButton">
          <Button
            onClick={() => setUserAccount(false)}
            className={userAccount ? 'btnEmp' : 'btnJob'}
          >
            Я работодатель
          </Button>

          <Button
            onClick={() => setUserAccount(true)}
            className={userAccount ? 'btnJob' : 'btnEmp'}
          >
            Я соискатель
          </Button>
        </div>
        <div className="registrationInput">
          {userAccount ? (
            <div className="inputApplicant">
              <input
                required
                value={jobLastName}
                onChange={(e) => setJobLastName(e.target.value)}
                type="text"
                placeholder="Имя"
              />
              <input
                required
                value={jobFirstName}
                onChange={(e) => setJobFirstName(e.target.value)}
                type="text"
                placeholder="Фамилия"
              />
            </div>
          ) : (
            <>
              <input
                required
                value={employerCompany}
                onChange={(e) => setEmployerCompany(e.target.value)}
                type="text"
                placeholder="Наименование компании"
              />
            </>
          )}

          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            type="email"
            placeholder="Электронная почта"
          />
          <div className="passwordIcon">
            <input
              required
              className="inputPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={hide ? 'text' : 'password'}
              placeholder="Пароль"
            />
            <div className={employer ? 'iconHide' : 'iconEmp'}>
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
          </div>
        </div>
        <div className="Registration">
          <button
            onClick={
              userAccount ? () => clickApplicant(createApplicant) : () => clickEmployer(createEmp)
            }
          >
            Создать аккаунт
          </button>
          <div className="registrationBtnGoogle">
            <span className="registrationIconsGoogle">
              <FcGoogle />
            </span>
            <button>Продолжить с Google</button>
          </div>
        </div>
        <div className="btnCome">
          <p>
            У вас уже есть аккаунт? <b onClick={() => clickCome()}>Войти</b>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Registration
