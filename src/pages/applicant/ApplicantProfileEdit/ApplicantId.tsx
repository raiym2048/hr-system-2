import { useEffect, useState } from 'react'
import applicantService from '../../../services/applicantService'
import defaultLogo from '../../../assets/defaultLogo.svg'
import edit from '../../../assets/edit.svg'
// import fileService from '../../../services.tsx/fileService'
import { useNavigate } from 'react-router-dom'
import monthNumberToName from '../../../helpers/monthNumberToName'
import { useParams } from 'react-router-dom'
import removeDateFromFilename from '../../../helpers/removeDateFromFilename'

export type TEducationResponse = {
  education: string
  university: string
  endMonth: string
  endYear: string
  studying: boolean
}

export type TProfessionResponse = {
  position: string
  companyName: string
  startedMonth: string
  startedYear: string
  endMonth: string
  endYear: string
  skills: string
}
export type TProfile = {
  id: number,
  firstname: string
  lastname: string
  position: string
  about: string
  educationResponse: TEducationResponse[]
  professionResponse: TProfessionResponse[]
  phoneNumber: string
  email: string
  country: string
  city: string
  address: string
  birthday: string
  industry: string
}

const ApplicantId = () => {
  const [profile, setProfile] = useState<TProfile | null>(null)
  const [logoPath, setLogoPath] = useState('')
  const [resumePath, setResumePath] = useState('')
  const [resumeName, setResumeName] = useState('')
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      if (params?.id) {
        const profileResponse = await applicantService.getProfile(params.id)

        setProfile(profileResponse)
        setLogoPath(profileResponse.imageResponse.path)
        setResumePath(profileResponse.resumeResponse.path)
        const resumeTemp = profileResponse.resumeResponse.name
        setResumeName(removeDateFromFilename(resumeTemp))

        // const resumeResponse = await fileService.getResume(profileResponse.resumeId)
        // const resumeName = `${profileResponse.firstname || 'name'}.${profileResponse.lastname || 'lastname'}-cv.pdf`

        const anchorElement = document.getElementById('cv') as HTMLAnchorElement
        if (anchorElement) {
          anchorElement.href = window.URL.createObjectURL(profileResponse.resumeResponse)
          anchorElement.download = resumeName
          anchorElement.innerHTML = resumeName
        }
      }
    })()
  }, [params.id, resumeName])

  const profileQueryStatus = 'fulfilled'

  const handleEdit = async () => {
    navigate('/applicant/edit/')
  }

  return (
    <div className="container">
      {!(profileQueryStatus === 'fulfilled' && profile) ? (
        <p className="pendingMessage">Waiting for data</p>
      ) : (
        <div className="details">
          <div className="detailsMain">
            <p className="mainTitle">Мой профиль</p>

            <div className="detailsMain__title">
              <p className="mainTitle">{profile.position}</p>
            </div>
            <div className="brandGroup">
              <img id="logo" className="brandGroup__pic" src={logoPath || defaultLogo}></img>
              <p className="brandGroup__text">{profile.firstname}</p>
              <p className="brandGroup__text">{profile.lastname}</p>
            </div>

            <div className="detailsMain__sectionStart">
              <p className="subtitle text">О себе</p>
              <p className="detailsMain__bodyOfText text">{profile.about}</p>
            </div>

            {profile.educationResponse.map((item, index) => (
              <>
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
              </>
            ))}

            {profile.professionResponse.map((item, index) => (
              <>
                <div className="detailsMain__sectionStart">
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
                    <span className="text">{monthNumberToName(Number(item?.startedMonth))}, </span>
                    <span className="text">{item?.startedYear} - </span>
                    <span className="text">{monthNumberToName(Number(item?.endMonth))}, </span>
                    <span className="text">{item?.endYear}</span>
                  </div>
                </div>
              </>
            ))}
          </div>

          <div className="detailsSecondary">
            <div className="detailsSecondary__iconsGroup">
              <img className="smallIcon buttonClean" src={edit} onClick={handleEdit}></img>
            </div>

            <p className="detailsSecondary__categoryName categoryNameText">CV</p>
            {resumePath ? (
              <a className="text text--hyperlinkSafe" href={resumePath}>
                {resumeName}
              </a>
            ) : (
              <p className="text">Резюме не загрузилось</p>
            )}
            <p className="detailsSecondary__categoryValue categoryValueText">{profile.industry}</p>
            <hr className="detailsSecondary__line" />
            <p className="detailsSecondary__categoryName categoryNameText">Дата рождения</p>
            <p className="detailsSecondary__categoryValue categoryValueText">
              {new Date(profile.birthday).toLocaleDateString('en-GB')}
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
      )}
    </div>
  )
}
export default ApplicantId
