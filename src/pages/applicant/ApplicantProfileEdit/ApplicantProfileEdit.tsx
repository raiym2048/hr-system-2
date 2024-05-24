import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import applicantService from '../../../services/applicantService'
import fileService from '../../../services/fileService'
import { useEffect, useState } from 'react'
import PersonalInfo from './PersonalInfo'
import ProfessionalSkills from './ProfessionalSkills'
import { labelsAndValuesToString } from '../../../helpers/labelsAndValuesToString'
import registerService from '../../../services/registration'
import serverResponseToProfileForm from '../../../helpers/serverResponseToProfileForm'
import dayjs, { Dayjs } from 'dayjs'

export type TEducations = {
  education: { value: string; label: string }
  university: string
  endMonth: { value: string; label: string }
  endYear: { value: string; label: string }
  studying: boolean
}

export type TProfessions = {
  position: { value: string; label: string }
  companyName: string
  startedMonth: { value: string; label: string }
  startedYear: { value: string; label: string }
  endMonth: { value: string; label: string }
  endYear: { value: string; label: string }
  skills: string
  workingNow: boolean
}

export type TApplicantProfileData = {
  imageId: number
  firstname: string
  lastname: string
  birthday: Dayjs
  country: { label: string; value: string }
  city: string
  address: string
  phoneNumber: string
  about: string
  educationRequests: TEducations[]
  professionRequests: TProfessions[]
  experience: string
  working_place: string
  untilNow: true
  skills: string
  resumeId: number
  logo: FileList
  cv: FileList
}

const emptyEducationObject = {
  education: { value: '', label: '' },
  university: '',
  endMonth: { value: '', label: '' },
  endYear: { value: '', label: '' },
  studying: false,
}

const emptyProfessionObject = {
  position: { value: '', label: '' },
  companyName: '',
  startedMonth: { value: '', label: '' },
  startedYear: { value: '', label: '' },
  endMonth: { value: '', label: '' },
  endYear: { value: '', label: '' },
  skills: '',
  workingNow: false,
}

const ApplicantProfileEdit = () => {
  const [chosenTab, setChosenTab] = useState<number>(1)
  const navigate = useNavigate()
  const {
    handleSubmit,
    control,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm<TApplicantProfileData>({
    defaultValues: {
      educationRequests: [emptyEducationObject],
      professionRequests: [emptyProfessionObject],
      birthday: dayjs('2000-01-01T12:30'),
    },
  })

  useEffect(() => {
    ;(async () => {
      const profileResponse = await applicantService.getProfile(registerService.user.id as string)

      if (profileResponse.firstname) {
        const modifiedProfileResponse = serverResponseToProfileForm(profileResponse)

        const fetchedLogo = await fetch(profileResponse.imageResponse?.path) // fetch the logo...
        const logoBlob = await fetchedLogo.blob() // ... make it a blob, then make it a file
        const logoFile = new File([logoBlob], profileResponse.imageResponse?.name, {
          type: 'image/png',
        })
        const logoContainer = new DataTransfer()
        logoContainer.items.add(logoFile) //... then make it a filelist and in reset make it logo's value

        const resumeBlob = await fileService.getResume(profileResponse.resumeResponse.id)
        const resumeFile = new File([resumeBlob], profileResponse.resumeResponse?.name, {
          type: resumeBlob.type,
        })
        const resumeContainer = new DataTransfer()
        resumeContainer.items.add(resumeFile)

        reset({
          ...modifiedProfileResponse,
          logo: logoContainer.files,
          cv: resumeContainer.files,
        })
      }
    })()
  }, [reset])

  const onSubmit = async (data: TApplicantProfileData) => {
    const timezoneOffset = data.birthday.toDate().getTimezoneOffset()
    const obj = {
      firstname: data.firstname,
      lastname: data.lastname,
      birthday: data.birthday.add(-timezoneOffset, 'minute').toDate(), // Add hours to keep current date after conversion to GMT (-6 or -7 hours), because backend only saves the date as string
      country: data.country.value,
      city: data.city,
      address: data.address,
      phoneNumber: data.phoneNumber,
      about: data.about,
      educationRequests: labelsAndValuesToString(data.educationRequests),
      professionRequests: labelsAndValuesToString(data.professionRequests),
    }

    const logoFile = new FormData()
    logoFile.append('file', data.logo[0])

    const cvFile = new FormData()
    cvFile.append('file', data.cv[0])
    // return
    const dataResponse = await applicantService.updateProfile(obj)
    const logoResponse = await fileService.updateLogo(logoFile)
    const cvResponse = await fileService.updateResume(cvFile)
    console.log(dataResponse)
    console.log( logoResponse)
    console.log( cvResponse)
    navigate(`/applicant/${registerService.user.id}`)
  }

  const handleCancel = () => {
    navigate(`/applicant/${registerService.user.id}`)
  }

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <p className="mainTitle">Мой профиль</p>

        <div className="form__tabs tabs">
          <p
            className={`tabs__menuItem ${chosenTab === 1 && 'tabs__menuItem--active'}`}
            onClick={() => setChosenTab(1)}
          >
            Личная информация
          </p>
          <p
            className={`tabs__menuItem ${chosenTab === 2 && 'tabs__menuItem--active'}`}
            onClick={() => setChosenTab(2)}
          >
            Профессиональные навыки
          </p>
        </div>
        <hr className="tabs__line" />

        {chosenTab === 1 ? (
          <PersonalInfo
            control={control}
            register={register}
            reset={reset}
            watch={watch}
            errors={errors}
          />
        ) : (
          <ProfessionalSkills
            control={control}
            register={register}
            reset={reset}
            watch={watch}
            errors={errors}
            emptyEducationObject={emptyEducationObject}
            emptyProfessionObject={emptyProfessionObject}
          />
        )}

        <div className="form__submitButtons">
          <button onClick={() => setChosenTab(2)} className="button button--submit" type="submit">
            Сохранить
          </button>
          <button className="button button--cancel" onClick={handleCancel}>
            Отмена
          </button>
        </div>
      </form>
    </div>
  )
}
export default ApplicantProfileEdit
