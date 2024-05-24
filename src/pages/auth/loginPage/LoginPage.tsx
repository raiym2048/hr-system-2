import { useEffect, useState } from 'react'
import './_LoginPage.scss'
import { FcGoogle } from 'react-icons/fc'
import { useNavigate } from 'react-router'
import { BiHide } from 'react-icons/bi'
import { BiShow } from 'react-icons/bi'
import { Button } from '../../../components/ui/Button/Button'
import {
  getEmployerNotification,
  getJobNotification,
  loginRegister,
} from '../../../redux/slice/authSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/store/store'
import { getUnreadMessagesCount } from '../../../redux/slice/chatSlice'

function LoginPage() {
  const navigate = useNavigate()
  const [hide, setHide] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()
  const user: any = useAppSelector((state) => state.authSlice.user)

  console.log('global', user)

  const login = {
    email: email,
    password: password,
  }

  useEffect(() => {
    if (user === null || (Array.isArray(user) && user.length === 0)) return
    if (user.user.role === 'EMPLOYER') {
      navigate(`/employer/vacancies`)
      dispatch(getEmployerNotification(user.user.id))
    } else if (user.user.role === 'JOB_SEEKER') {
      dispatch(getJobNotification(user.user.id))
      navigate('/applicant/vacancies')
    } else if(user.user.role === 'ADMIN') {
      navigate('/admin/user')
    }
  }, [user])

  const handleLoginBtn = () => {
    dispatch(loginRegister(login))
  }

  const clickPassword = () => {
    navigate('/forgotPassword')
  }
  const clickCreate = () => {
    navigate('/registration')
  }
  return (
    <div>
      <div className="loginPage">
        <div className="loginRole">
          <h2>Войти</h2>
          <span>С возвращением! Пожалуйста, введите свои данные</span>
        </div>

        <div className="loginInput">
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Электронная почта"
          />
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={hide ? 'text' : 'password'}
            placeholder="Пароль"
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
        </div>
        <div className="forgot">
          <span onClick={() => clickPassword()}>Забыли пароль ?</span>
        </div>
        <div className="loginRegistration">
          <Button onClick={() => handleLoginBtn()}>Войти</Button>
          <div className="btnGoogle">
            <span className="iconsGoogle">
              <FcGoogle />
            </span>
            <Button>Продолжить с Google</Button>
          </div>
        </div>
        <div className="loginAccount">
          <p>
            У вас нет аккаунта?
            <b onClick={() => clickCreate()}>Создать аккаунт</b>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
