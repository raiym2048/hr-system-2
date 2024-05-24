
import { useEffect, useState } from 'react'
import applicantService from '../../services/applicantService'
import bookmark from '../../assets/bookmark.svg'
import defaultLogo from '../../assets/defaultLogo.svg'
import chat from '../../assets/chat.svg'
import check from '../../assets/check.svg'
import close from '../../assets/close.svg'
import { Link, useParams } from 'react-router-dom'
import monthNumberToName from '../../helpers/monthNumberToName'
import { TProfile } from '../applicant/ApplicantProfileEdit/ApplicantId'
import removeDateFromFilename from '../../helpers/removeDateFromFilename'
import registerService from '../../services/registration'
import { useDispatch } from 'react-redux'
import {
  getBookmarkedApplicants,
  setIsApplicantBookmarked,
} from '../../redux/slice/bookmarkedApplicantsSlice'
import { AppDispatch, useAppSelector } from '../../redux/store/store'
import {
  getApplicationStatus,
  setApplicationStatus,
} from '../../redux/slice/applicationStatusSlice'

const ApplicantDetailsAsEmployer = () => {
  const [profile, setProfile] = useState<TProfile | null>(null)
  const [logoPath, setLogoPath] = useState('')
  const [resumePath, setResumePath] = useState('')
  const [resumeName, setResumeName] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const params = useParams()
  const { bookmarkedApplicants } = useAppSelector((state) => state.bookmarkedApplicants)
  console.log(profile)
  useEffect(() => {
    ;(async () => {
      dispatch(getBookmarkedApplicants(registerService?.user?.id as string))
      dispatch(getApplicationStatus())

      if (params?.applicantId) {
        const profileResponse = await applicantService.getProfile(params.applicantId)

        setProfile(profileResponse)
        profileResponse.imageResponse && setLogoPath(profileResponse.imageResponse.path)
        profileResponse.resumeResponse &&
          (() => {
            setResumePath(profileResponse.resumeResponse.path)
            setResumeName(removeDateFromFilename(profileResponse.resumeResponse.name))
          })()
      }
    })()
  }, [dispatch, params.applicantId])

  const handleBookmark = async () => {
    if (registerService.user.id && profile?.id) {
      await dispatch(
        setIsApplicantBookmarked({
          userId: registerService.user.id as string,
          jobseekerId: profile.id.toString(),
        })
      )
      dispatch(getBookmarkedApplicants(registerService?.user?.id as string))
    }
  }

  const handleAcceptOrDecline = async (status: string) => {
    if (registerService.user.id && profile?.id) {
      await dispatch(
        setApplicationStatus({
          vacancyId: 'asdf',
          jobseekerId: profile.id.toString(),
          status,
        })
      )
      dispatch(getApplicationStatus())
    }
  }

  const isApplicantBookmarked = bookmarkedApplicants.some(
    (item) => item.candidateId === profile?.id
  )

  return (
    <div className="container">
      {!profile ? (
        <p className="pendingMessage">Waiting for data</p>
      ) : (
        <>
          <div className="titleAndButtonsLine">
            <img
              id="bookmark"
              className={isApplicantBookmarked ? 'buttonChosen' : 'buttonChosen buttonChosen--not'}
              src={bookmark}
              onClick={handleBookmark}
            ></img>

            <p className="mainTitle">{profile.firstname}</p>
            <p className="mainTitle">{profile.lastname}</p>

            <div
              className="titleAndButtonsLine__rightPart button button--happy button--contentApart"
              onClick={() => handleAcceptOrDecline('принято')}
            >
              Принять
              <img src={check}></img>
            </div>
            <div
              className="button button--dangerLighter button--contentApart"
              onClick={() => handleAcceptOrDecline('отклонено')}
            >
              Отклонить
              <img className="iconWhite" src={close}></img>
            </div>
          </div>

          <div className="details details--higher">
            <div className="detailsMain">
              <div className="brandGroup">
                <img id="logo" className="brandGroup__pic" src={logoPath || defaultLogo}></img>
                <p className="brandGroup__text">
                  {profile?.professionResponse[profile?.professionResponse?.length - 1]?.position ||
                    'Позиция'}
                </p>
              </div>

              <div className="detailsMain__sectionStart">
                <p className="subtitle text">О себе</p>
                <p className="detailsMain__bodyOfText text">{profile.about}</p>
              </div>

              {profile.educationResponse.map((item, index) => (
                <div key={index}>
                  <div  className="detailsMain__sectionStart">
                    <p>
                      <span className="text subtitle">Образование</span>
                      <span className="text subtitle lighterText"> #{index + 1}</span>
                    </p>
                    <p className="detailsMain__bodyOfText text">{item.education}</p>
                  </div>

                  <div className="detailsMain__sectionStart">
                    <p className="subtitle">Учебное заведение</p>
                    <p className="detailsMain__bodyOfText text">{item.university}</p>
                  </div>

                  <div className="detailsMain__sectionStart">
                    <p className="subtitle">Месяц и год окончания</p>
                    <p className="detailsMain__bodyOfText text">
                      <span>{monthNumberToName(Number(item.endMonth))}, </span>
                      <span className="text">{item.endYear}</span>
                    </p>
                  </div>
                </div>
              ))}

              {profile.professionResponse.map((item, index) => (
                <div  key={index} >
                  <div   className="detailsMain__sectionStart">
                    <p>
                      <span className="text subtitle">Позиция</span>
                      <span className="text subtitle lighterText"> #{index + 1}</span>
                    </p>
                    <p className="detailsMain__bodyOfText text">{item?.position}</p>
                  </div>

                  <div className="detailsMain__sectionStart">
                    <p className="subtitle">Место работы</p>
                    <p className="detailsMain__bodyOfText text">{item?.companyName}</p>
                  </div>

                  <div className="detailsMain__sectionStart">
                    <p className="subtitle">Период работы</p>
                    <div className="detailsMain__bodyOfText">
                      <span className="text">
                        {monthNumberToName(Number(item?.startedMonth))},{' '}
                      </span>
                      <span className="text">{item?.startedYear} - </span>
                      <span className="text">{monthNumberToName(Number(item?.endMonth))}, </span>
                      <span className="text">{item?.endYear}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="detailsSecondary">
              <div className="detailsSecondary__iconsGroup">
                <Link to={`/employer/chat/with${params?.applicantId}`}>
                  <img className="buttonClean" src={chat}></img>
                </Link>
              </div>

              <p className="detailsSecondary__categoryName categoryNameText">CV</p>
              {resumePath ? (
                <a className="text text--hyperlinkSafe" href={resumePath}>
                  {resumeName}
                </a>
              ) : (
                <p className="text">Резюме не загрузилось</p>
              )}
              <p className="detailsSecondary__categoryValue categoryValueText">
                {profile.industry}
              </p>
              <hr className="detailsSecondary__line" />
              <p className="detailsSecondary__categoryName categoryNameText">Дата рождения</p>
              <p className="detailsSecondary__categoryValue categoryValueText">
                {profile.birthday
                  ? new Date(profile.birthday).toLocaleDateString('en-GB')
                  : 'День рождения не указан'}
              </p>
              <hr className="detailsSecondary__line" />
              <p className="detailsSecondary__categoryName categoryNameText">Страна</p>
              <p className="detailsSecondary__categoryValue categoryValueText">{profile.country}</p>
              <hr className="detailsSecondary__line" />
              <p className="detailsSecondary__categoryName categoryNameText">Город</p>
              <p className="detailsSecondary__categoryValue categoryValueText">{profile.city}</p>
              <hr className="detailsSecondary__line" />
              <p className="detailsSecondary__categoryName categoryNameText">Адрес</p>
              <p className="detailsSecondary__categoryValue categoryValueText">{profile.address}</p>
              <hr className="detailsSecondary__line" />
              <p className="detailsSecondary__categoryName categoryNameText">Электронная почта</p>
              <p className="detailsSecondary__categoryValue categoryValueText">{profile.email}</p>
              <hr className="detailsSecondary__line" />
              <p className="detailsSecondary__categoryName categoryNameText">Телефон</p>
              <p className="detailsSecondary__categoryValue categoryValueText">
                {profile.phoneNumber}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
export default ApplicantDetailsAsEmployer
