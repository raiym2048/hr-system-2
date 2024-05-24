import edit from '../../assets/edit.svg'
import { useNavigate } from 'react-router-dom'
import employerService from '../../services/employerService'
import { useEffect, useState } from 'react'
import defaultIcon from '../../assets/account_circle.svg'
import { TFetchedEmployerProfileInfo } from '../../exportedTypes/fetchedEmployerProfileInfo'

export const EmployerProfile = () => {
  const navigate = useNavigate()
  const [profileInfo, setProfileInfo] = useState<TFetchedEmployerProfileInfo | null>(null)

  useEffect(() => {
    ;(async () => {
      const response = await employerService.getProfile()
      setProfileInfo(response)
    })()
  }, [])

  const handleEdit = async () => {
    navigate('/employer/edit/')
  }

  return (
    <div className="container">
      {!profileInfo ? (
        <p className="pendingMessage">Waiting for data</p>
      ) : (
        <div className="details details--lower">
          <div className="detailsMain">
            <p className="mainTitle text">Мой профиль</p>
            <div className="brandGroup brandGroup--farther">
              <img
                className="brandGroup__pic"
                src={profileInfo.fileResponse?.path || defaultIcon}
              ></img>
              {profileInfo.companyName ? (
                <p className="brandGroup__text">{profileInfo.companyName}</p>
              ) : (
                <p className=" brandGroup__text brandGroup__text--noName">
                  Название компании не указано
                </p>
              )}
            </div>

            <div className="detailsMain__sectionStart">
              <p className="subtitle text">О компании</p>
              <p className="detailsMain__bodyOfText text">{profileInfo.aboutCompany}</p>
            </div>
          </div>
          <div className="detailsSecondary">
            <div className="detailsSecondary__iconsGroup">
              <img className="smallIcon buttonClean" src={edit} onClick={handleEdit}></img>
            </div>

            <p className="detailsSecondary__categoryName detailsSecondary__categoryName--first categoryNameText">
              Страна
            </p>
            <p className="detailsSecondary__categoryValue categoryValueText">
              {profileInfo.country}
            </p>
            <hr className="detailsSecondary__line" />

            <p className="detailsSecondary__categoryName categoryNameText">Город</p>
            <p className="detailsSecondary__categoryValue categoryValueText">{profileInfo.city}</p>
            <hr className="detailsSecondary__line" />
            <p className="detailsSecondary__categoryName categoryNameText">Адрес</p>
            <p className="detailsSecondary__categoryValue categoryValueText">
              {profileInfo.address}
            </p>
            <hr className="detailsSecondary__line" />
            <p className="detailsSecondary__categoryName categoryNameText">Электронная почта</p>
            <p className="detailsSecondary__categoryValue categoryValueText">{profileInfo.email}</p>
            <hr className="detailsSecondary__line" />
            <p className="detailsSecondary__categoryName categoryNameText">Телефон</p>
            <p className="detailsSecondary__categoryValue categoryValueText">
              {profileInfo.phoneNumber}
            </p>
            <hr className="detailsSecondary__line" />
          </div>
        </div>
      )}
    </div>
  )
}
