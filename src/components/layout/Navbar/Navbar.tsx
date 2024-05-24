import { classNames } from '../../../utils/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import MainIcon from '../../ui/MainIcon/MainIcon'
import { Button, ButtonTheme } from '../../ui/Button/Button'
import '../../../app/style/index.scss'
import { useNavigate } from 'react-router-dom'
import { BsChatLeftDotsFill, BsFillCaretDownFill } from 'react-icons/bs'
import { IoMdNotifications } from 'react-icons/io'
import { FiPlus } from 'react-icons/fi'
import { useAppDispatch, useAppSelector } from '../../../redux/store/store'
import { IEmployerNotification, setProfile, setUser } from '../../../redux/slice/authSlice'
import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Avatar } from '../../ui/Avatar/Avatar'
import { baseUrl } from '../../../services/commonVariables.tsx'

interface NavbarProps {
    className?: string
}

const Navbar = ({ className }: NavbarProps) => {
    const user = useAppSelector((state) => state.authSlice.user)
    const [modalNavbar, setModalNavbar] = useState(false)
    const [notifications, setNotifications] = useState(false)
    const unreadMessages = useAppSelector((state) => state.chatInformation.unreadMessagesCount)
    const employerNotification = useAppSelector((state) => state.authSlice.employerNotification)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    // useEffect(() => {
    //     dispatch(getEmployerNotification(user.user.id))
    // }, []);
    const clickLogin = () => {
        navigate('login')
        setModalNavbar(false)
    }
    const clickProfile = () => {
        if (user.user.role === 'EMPLOYER') {
            navigate(`/employer`)
        } else if (user.user.role === 'JOB_SEEKER') {
            navigate(`/applicant/${user.user.id}`)
        }
        setModalNavbar(false)
    }
    const clickEdit = () => {
        if (user.user.role === 'EMPLOYER') {
            navigate(`/employer/edit`)
        } else if (user.user.role === 'JOB_SEEKER') {
            navigate('/applicant/edit')
        }
        setModalNavbar(false)
    }
    const clickModal = () => {
        setModalNavbar(!modalNavbar)
    }
    const clickLogo = () => {
        navigate('/')
        setModalNavbar(false)
    }

    const clickVacancies = () => {
        navigate(`vacancies`)
        setModalNavbar(false)
    }

    const clickRegistration = () => {
        localStorage.clear()
        dispatch(setProfile(null))
        dispatch(setUser(null))
        setModalNavbar(false)
        navigate('/registration')
    }
    const clickCreateVacancies = () => {
        navigate('/employer/vacancy/form')
    }
    const clickJob = () => {
        navigate('/applicant/vacancies')
    }
    return (
      <header className={classNames(cls.Navbar, {}, [className ?? ''])}>
          <div className={'container'}>
              <div className={cls.header}>
                  <ul className={cls.mainLink}>
            <span onClick={clickLogo}>
              <MainIcon className={cls.links} />
            </span>
                      {user === null ? (
                        <li onClick={clickVacancies} className={cls.links}>
                            Вакансии
                        </li>
                      ) : null}
                      <li className={cls.links}>FAQ</li>
                      <li className={cls.links}>Контакты</li>
                  </ul>
                  {user?.user?.role === 'ADMIN' ||  user?.user?.role === 'EMPLOYER' || user?.user?.role === 'JOB_SEEKER' ? (
                    <div className={cls.authNavbar}>
                        <div className={cls.navbarIcons}>
                            {user?.user?.role === 'ADMIN' ? (
                              ''
                            ) : (
                              <>
                    <span onClick={() => navigate('employer/chat')} className={cls.chatNavbar}>
                      {unreadMessages !== null && unreadMessages > 0 && <p>{unreadMessages}</p>}
                        <BsChatLeftDotsFill />
                    </span>

                                  <span
                                    onClick={() => setNotifications(!notifications)}
                                    className={cls.notificationsNavbar}
                                  >
                      <p>{`${employerNotification.length}`}</p>
                      <IoMdNotifications />
                    </span>
                              </>
                            )}
                            {notifications ? (
                              user.user?.role === 'EMPLOYER' ? (
                                <div className={cls.modalNotifications}>
                                    {employerNotification.map((item: IEmployerNotification) => {
                                        return (
                                          <div key={item.id} className={cls.notificationsContainer}>
                                              <div className="imgNavbar">
                                                  <Avatar src={`${baseUrl}/file/resume/${item.imageId}`} size={50} />
                                              </div>

                                              <div className={cls.textNotifications}>
                                                  <p
                                                    style={{
                                                        fontSize: '16px',
                                                        color: '#F9AB00',
                                                        textTransform: 'uppercase',
                                                    }}
                                                  >
                                                      {`${item.title}  .`}{' '}
                                                      <span
                                                        style={{ textTransform: 'lowercase' }}
                                                      >{`${item.arrivedDate}`}</span>
                                                  </p>
                                                  <p>{`${item.content}`}</p>
                                              </div>
                                              <span>
                              <AiOutlineClose />
                            </span>
                                          </div>
                                        )
                                    })}
                                </div>
                              ) : user.user?.role === 'JOB_SEEKER' ? (
                                <div className={cls.modalNotifications}>
                                    <div className={cls.notificationsContainer}>
                                        <div className="imgNavbar">
                                            <img
                                              src={`${baseUrl}/file/resume/${employerNotification.imageId}`}
                                              alt=""
                                            />
                                        </div>

                                        <div className={cls.textNotifications}>
                                            <p>
                                                {`${employerNotification.title}`}{' '}
                                                <span>{`${employerNotification.arrivedDate}`}</span>
                                            </p>
                                            <p>{`${employerNotification.content}`}</p>
                                        </div>
                                        <span>
                          <AiOutlineClose />
                        </span>
                                    </div>
                                </div>
                              ) : (
                                ''
                              )
                            ) : (
                              ''
                            )}
                        </div>
                        <div className={cls.navbarButton}>
                            <Button onClick={clickModal} className={cls.btn_child} theme={ButtonTheme.GRAY_BTN}>
                                {user.user?.fileResponse?.path && (
                                  <Avatar src={user.user?.fileResponse.path} size={30} />
                                )}
                                <>
                                    {user.user?.role === 'EMPLOYER'
                                      ? `${user.user?.companyName}`
                                      : `${user.user?.lastname}`}
                                </>

                                <span className={cls.downNavbar}>
                    <BsFillCaretDownFill size={'13px'} />
                  </span>
                            </Button>
                            <div className={cls.modal}>
                                {modalNavbar ? (
                                  <>
                                      {user.user?.role === 'EMPLOYER' || user.user?.role === 'JOB_SEEKER' ? (
                                        <ul className={cls.modalNavbar}>
                                            <li onClick={clickProfile}>Мой профиль</li>
                                            <li onClick={clickEdit}>Настройки</li>
                                            <li onClick={clickRegistration}>Выйти</li>
                                        </ul>
                                      ) : (
                                        <ul className={cls.modalNavbar}>
                                            <li onClick={clickRegistration}>Выйти</li>
                                        </ul>
                                      )}
                                  </>
                                ) : (
                                  ''
                                )}
                            </div>

                            {user.user?.role === 'EMPLOYER' ? (
                              <Button
                                onClick={clickCreateVacancies}
                                className={cls.btn_child1}
                                theme={ButtonTheme.BLUE_BTN}
                              >
                    <span className={cls.navbarPlus}>
                      <FiPlus size={'15px'} />
                    </span>
                                  Создать вакансию
                              </Button>
                            ) : user.user?.role === 'JOB_SEEKER' ? (
                              <Button theme={ButtonTheme.BLUE_BTN} onClick={clickJob} className={cls.btnJob}>
                                  Найти работу
                              </Button>
                            ) : (
                              ''
                            )}
                        </div>
                    </div>
                  ) : (
                    <div className={cls.btn}>
                        <Button onClick={clickLogin} theme={ButtonTheme.GRAY_BTN} className={cls.btn_child}>
                            Войти
                        </Button>
                        <Button
                          onClick={clickRegistration}
                          className={cls.btn_child}
                          theme={ButtonTheme.BLUE_BTN}
                        >
                            Регистрация
                        </Button>
                    </div>
                  )}
              </div>
          </div>
      </header>
    )
}

export default Navbar
