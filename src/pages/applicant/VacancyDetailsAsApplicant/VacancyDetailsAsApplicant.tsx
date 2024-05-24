import count from '../../../assets/account_circle.svg'
import call from '../../../assets/call.svg'
import chat from '../../../assets/chat.svg'
// import { PopupActions } from 'reactjs-popup/dist/types'
import {useNavigate, useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {getVacancyById, selectVacancyStatus} from '../../../redux/slice/vacancyByIdSlice'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, useAppSelector} from '../../../redux/store/store'
import ApplicationModal from './ApplicationModal'
import applicantService from '../../../services/applicantService'
import {modifyTypeOfEmployments} from '../../../helpers/modifyTypeOfEmployments'
import {getUserAppliedToVacancy} from '../../../redux/slice/userAppliedToVacancySlice'
import registerService from '../../../services/registration'
import {Avatar} from "../../../components/ui/Avatar/Avatar";
import Loader from "../../../components/ui/Loader/Loader";
import cls from "../../Admin/AdminUser/UserTable/UserTable.module.scss";
import {Button, ButtonTheme} from "../../../components/ui/Button/Button";

type TRecommendedVacancies = {
    id: number
    position: string
    companyName: string
    country: string
    city: string
    typeOfEmploymentS: string
    salaryResponse: {
        salarySum: number
        valute: string
    }
}

const VacancyDetailsAsApplicant = () => {
    const {vacancy} = useAppSelector((state) => state.vacancy)
    const {userAppliedToVacancy} = useAppSelector((state) => state.userAppliedToVacancy)
    const user = useAppSelector((state) => state.authSlice.user)
    const [openApply, setOpenApply] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [recommendedVacancies, setRecommendedVacancies] = useState<TRecommendedVacancies[] | null>(
        null
    )
    const [applicantInfo, setApplicantInfo] = useState(null)
    const vacancyQueryStatus = useSelector(selectVacancyStatus)
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        ;(async () => {
            if (params.vacancyId) {
                dispatch(getVacancyById(params.vacancyId))
                dispatch(getUserAppliedToVacancy(params.vacancyId))
                const resultRecommended = await applicantService.getRecommendedVacancies(params.vacancyId)
                setRecommendedVacancies(resultRecommended)
                if (registerService.user.id) {
                    const resultApplicant = await applicantService.getProfile(registerService.user.id)
                    setApplicantInfo(resultApplicant)
                }
            }
        })()
    }, [params.vacancyId, dispatch])

    const handleOpenModal = (bool: boolean) => {
        setOpenApply(bool)
    }

    const handleChat = (id: number) => {
        navigate(`/employer/chat/with/${id}`)
    }
    const handleRecommended = (id: number) => {
        navigate(`/applicant/vacancy/${id}`)
    }

    return (
        <div className="container">
            {!(vacancyQueryStatus === 'fulfilled' && vacancy) ? (
                <Loader size={"medium"}/>
            ) : (
                <div className="details">
                    <div className="detailsMain">
                        <p className="dateText">Дата объявления: 24.06.2023</p>
                        <div className="detailsMain__title">
                            <p className="mainTitle">{vacancy.position}</p>
                            {
                                user ? (
                                        <>
                                            {!userAppliedToVacancy &&
                                            <div className="button button--submit"
                                                 onClick={() => handleOpenModal(!openApply)}>
                                                Откликнуться
                                            </div>
                                            }
                                        </>
                                    )
                                    : setIsOpen(!isOpen)
                            }

                            <ApplicationModal
                                applicantInfo={applicantInfo}
                                openApply={openApply}
                                handleOpenModal={handleOpenModal}
                                vacancyId={params.vacancyId!}
                                status={`${vacancy.statusOfVacancy}`}
                            />
                        </div>
                        <div className="brandGroup">
                            <Avatar
                                src={`${vacancy.image?.path}`}
                                size={80}
                            />
                            <p className="brandGroup__text">{`${vacancy?.companyName}`}</p>
                        </div>

                        <div className="detailsMain__sectionStart">
                            <p className="subtitle text">О компании</p>
                            <p className="detailsMain__bodyOfText text">{vacancy.about_company}</p>
                        </div>

                        <div className="detailsMain__sectionStart">
                            <p className="subtitle">Описание к вакансии</p>
                            <p className="detailsMain__bodyOfText text">{vacancy.description}</p>
                        </div>

                        <div className="detailsMain__sectionStart">
                            <p className="subtitle">Требуемые навыки</p>
                            <ul className="detailsMain__bodyOfText detailsMain__bodyOfText--list text">
                                <li>{vacancy.skills}</li>
                            </ul>
                        </div>

                        <div className="detailsMain__sectionStart">
                            <p className="subtitle">Контактная информация</p>
                            <ul className="detailsMain__bodyOfText detailsMain__bodyOfText--list text">
                                <li>{vacancy.contactInformationResponse.country}</li>
                                <li>{vacancy.contactInformationResponse.city}</li>
                                <li>{vacancy.contactInformationResponse.street_house}</li>
                            </ul>
                        </div>

                        <div className="detailsMain__sectionStart">
                            <p className="subtitle">Дополнительная информация</p>
                            <ul className="detailsMain__bodyOfText  detailsMain__bodyOfText--list text">
                                <li>{vacancy.additionalInformation}</li>
                            </ul>
                        </div>
                    </div>

                    <div className="detailsSecondary">
                        <p className="detailsSecondary__categoryName detailsSecondary__categoryName--first categoryNameText">
                            Отклики
                        </p>
                        <div className="flexHorizontal detailsSecondary__categoryName--lower">
                            <img src={count}></img>
                            <span className="categoryValueText">{vacancy.respondedCount}</span>
                        </div>
                        <hr className="detailsSecondary__line"/>
                        <p className="detailsSecondary__categoryName categoryNameText">Локация</p>
                        <p className="detailsSecondary__categoryValue categoryValueText">
                            {vacancy.country}, {vacancy.city}
                        </p>
                        <hr className="detailsSecondary__line"/>
                        <p className="detailsSecondary__categoryName categoryNameText">Отрасль</p>
                        <p className="detailsSecondary__categoryValue categoryValueText">{vacancy.industry}</p>
                        <hr className="detailsSecondary__line"/>
                        <p className="detailsSecondary__categoryName categoryNameText">Вид занятости</p>
                        <p className="detailsSecondary__categoryValue categoryValueText">
                            {vacancy.typeOfEmploymentS}
                        </p>
                        <hr className="detailsSecondary__line"/>
                        <p className="detailsSecondary__categoryName categoryNameText">
                            Требуемый опыт работы/стаж
                        </p>
                        <p className="detailsSecondary__categoryValue categoryValueText">
                            {vacancy.requiredExperience}
                        </p>
                        <hr className="detailsSecondary__line"/>
                        <p className="detailsSecondary__categoryName categoryNameText">Оклад</p>
                        <p className="detailsSecondary__categoryValue detailsSecondary__categoryValue--mutipleValues categoryValueText ">
                            {vacancy.salaryResponse.salaryType}
                        </p>
                        <p className="detailsSecondary__categoryValue detailsSecondary__categoryValue--mutipleValues categoryValueText">
                            {vacancy.salaryResponse.salarySum} {vacancy.salaryResponse.valute}
                        </p>
                        <hr className="detailsSecondary__line"/>
                        <p className="detailsSecondary__categoryName categoryNameText">Связаться</p>
                        <div
                            className="flexHorizontal flexHorizontal--spreadWider detailsSecondary__categoryName--lower">
                            <img src={call}></img>
                            <img onClick={() => handleChat(10)} src={chat}></img>
                        </div>

                        {recommendedVacancies && (
                            <>
                                <p className="detailsSecondary__categoryName categoryNameText recommended__title">
                                    Похожие вакансии
                                </p>
                                <div className="recommended">
                                    {recommendedVacancies.map((item) => (
                                        <div key={item.id} className="recommended__item"
                                             onClick={() => handleRecommended(item.id)}>
                                            <div className="recommended__position specialText">
                                                <span>{item.position}</span> в <span>{item.companyName}</span>
                                            </div>

                                            <div className="recommended__salary recommended__doubleLine">
                                                <p className='categoryNameText'>Оклад</p>
                                                <span>{item.salaryResponse.salarySum} {item.salaryResponse.valute}</span>
                                            </div>

                                            <div className="recommended__type recommended__doubleLine">
                                                <p className='categoryNameText'>Вид занятости</p>
                                                <span>{modifyTypeOfEmployments(item.typeOfEmploymentS)}</span>
                                            </div>

                                            <div className="recommended__location recommended__doubleLine">
                                                <p className='categoryNameText'>Локация</p>
                                                <span>{item.country}, {item.city}</span>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/*<Chat/>*/}
                </div>
            )}

            {isOpen && (
                <div className={cls.modal}>
                    <div className={cls.modalContent}>
                        <h3 className={cls.modalContent__text}>Удалить выбранных пользователей</h3>
                        <p className={cls.modalContent__title}>Вы уверены, что хотите удалить выбранных
                            пользователей?</p>
                        <div className={cls.modalContent__btns}>
                            <Button
                                className={cls.modalBtnDelete}
                                theme={ButtonTheme.CLEAR_BTN}
                            >
                                Удалить
                            </Button>
                            <Button
                                className={cls.modalBtn}

                            >
                                Отмена
                            </Button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    )
}

export default VacancyDetailsAsApplicant
