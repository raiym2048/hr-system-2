import edit from '../../assets/edit.svg'
import remove from '../../assets/delete.svg'
import { useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import employerService from '../../services/employerService'
import Popup from 'reactjs-popup'
import close from '../../assets/close.svg'
import { PopupActions } from 'reactjs-popup/dist/types'
import { useNavigate } from 'react-router-dom'
import { getVacancyById, putVacancyStatus } from '../../redux/slice/vacancyByIdSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store/store'
import { useAppSelector } from '../../redux/store/store'
import { selectVacancyStatus } from '../../redux/slice/vacancyByIdSlice'
import { useSelector } from 'react-redux'
import declined from '../../helpers/ruDeclension'
import { modifyTypeOfEmployments } from '../../helpers/modifyTypeOfEmployments'
import { TFetchedEmployerProfileInfo } from '../../exportedTypes/fetchedEmployerProfileInfo'
import defaultIcon from '../../assets/account_circle.svg'

export const VacancyId = () => {
  const { vacancy, statusOfVacancy } = useAppSelector((state) => state.vacancy)
  const vacancyQueryStatus = useSelector(selectVacancyStatus)
  const [openRemove, setOpenRemove] = useState(false)
  const [openStatus, setOpenStatus] = useState(false)
  const [vacancyStatus, setVacancyStatus] = useState<Array<Record<string, string>> | null>(null)
  const [profileInfo, setProfileInfo] = useState<TFetchedEmployerProfileInfo | null>(null)
  const navigate = useNavigate()
  const ref = useRef<PopupActions>(null)
  const params = useParams()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    ;(async () => {
      const response = await employerService.getProfile()
      setProfileInfo(response)

      if (params.vacancyId) {
        dispatch(getVacancyById(params.vacancyId))
        const status = await employerService.getVacancyStatus()
        setVacancyStatus(status)
      }
    })()
  }, [params.vacancyId, dispatch])

  const removeVacancy = async (id: number) => {
    await employerService.removeVacancyById(id)
    setOpenRemove(false)
  }

  const handleStatus = async (status: string) => {
    if (vacancy) {
      ref.current?.close()
      dispatch(putVacancyStatus({ status: status, id: vacancy.id }))
    }
  }

  const handleEdit = async () => {
    navigate(`/employer/vacancy/edit/${vacancy?.id}`)
  }

  return (
    <div className="container">
      {!(vacancyQueryStatus === 'fulfilled' && vacancy) ? (
        <p className="pendingMessage">Waiting for data</p>
      ) : (
        <div className="details">
          <div className="detailsMain">
            <p className="dateText">Дата объявления: 24.06.2023</p>
            <div className="detailsMain__title">
              <p className="mainTitle">{vacancy.position}</p>
              <div className="button button--blue button--info">
                {declined(vacancy.respondedCount, 'отклик', 'отклика', 'откликов')}
              </div>
            </div>
            <div className="brandGroup brandGroup--farther">
              <img
                className="brandGroup__pic"
                src={profileInfo?.fileResponse?.path || defaultIcon}
              ></img>
              {profileInfo?.companyName ? (
                <p className="brandGroup__text">{profileInfo.companyName}</p>
              ) : (
                <p className=" brandGroup__text brandGroup__text--noName">
                  Название компании не указано
                </p>
              )}
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
            <div className="detailsSecondary__iconsGroup">
              <img className="smallIcon buttonClean" src={edit} onClick={handleEdit}></img>
              <img
                className="smallIcon buttonClean"
                src={remove}
                onClick={() => setOpenRemove(true)}
              ></img>
              <Popup
                onClose={() => setOpenRemove(false)}
                modal
                open={openRemove}
                className="popupModal"
              >
                <p className="bigText">Удалить объявление</p>
                <p className="popupModal__bodyOfText bodyOfText">
                  Вы пытаетесь удалить объявление. Это означает, что вы потеряете кандидатов,
                  связанных с этим объявлением.
                </p>
                <div className="popupModal__buttonsGroup">
                  <button
                    className="button button--danger"
                    onClick={() => removeVacancy(vacancy.id)}
                  >
                    <p>Удалить</p>
                  </button>
                  <button className="button button--cancel" onClick={() => setOpenRemove(false)}>
                    Отмена
                  </button>
                </div>
                <button
                  className="popupModal__cross buttonClean"
                  onClick={() => setOpenRemove(false)}
                >
                  <img className="smallIcon" src={close}></img>
                </button>
              </Popup>
            </div>
            <p className="detailsSecondary__categoryName categoryNameText">Статус</p>
            <Popup
              ref={ref}
              trigger={
                <button
                  className="button button--green detailsSecondary__button"
                  onClick={() => setOpenStatus(!openStatus)}
                >
                  {statusOfVacancy}
                  <span className="arrow button__arrow">&#9699;</span>
                </button>
              }
              onClose={() => setOpenStatus(false)}
              arrow={false}
              offsetX={-40}
              offsetY={5}
              className="popupTooltip"
            >
              {vacancyStatus === null ? (
                <p>Ошибка в получении данных. Проверьте соединение.</p>
              ) : (
                vacancyStatus.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="popupTooltip__choiceItem buttonClean text"
                      onClick={() => handleStatus(item.name)}
                    >
                      {item.name}
                    </div>
                  )
                })
              )}
            </Popup>
            <hr className="detailsSecondary__line" />
            <p className="detailsSecondary__categoryName categoryNameText">Отрасль</p>
            <p className="detailsSecondary__categoryValue categoryValueText">{vacancy.industry}</p>
            <hr className="detailsSecondary__line" />
            <p className="detailsSecondary__categoryName categoryNameText">Вид занятости</p>
            <p className="detailsSecondary__categoryValue categoryValueText">
              {modifyTypeOfEmployments(vacancy.typeOfEmploymentS)}
            </p>
            <hr className="detailsSecondary__line" />
            <p className="detailsSecondary__categoryName categoryNameText">
              Требуемый опыт работы/стаж
            </p>
            <p className="detailsSecondary__categoryValue categoryValueText">
              {vacancy.requiredExperience}
            </p>
            <hr className="detailsSecondary__line" />
            <p className="detailsSecondary__categoryName categoryNameText">Оклад</p>
            <p className="detailsSecondary__categoryValue detailsSecondary__categoryValue--mutipleValues categoryValueText ">
              {vacancy.salaryResponse.salaryType}
            </p>
            <p className="detailsSecondary__categoryValue detailsSecondary__categoryValue--mutipleValues categoryValueText">
              {vacancy.salaryResponse.salarySum} {vacancy.salaryResponse.valute}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
