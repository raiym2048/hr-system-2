import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { InputFlexible } from '../../components/reusable/inputFlexible'
import { inputStyles } from '../../app/style/vendors/_select'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCountries } from '../../redux/slice/countrySlice'
import { AppDispatch, useAppSelector } from '../../redux/store/store'
import { useNavigate } from 'react-router-dom'
import employerService from '../../services/employerService'
import { getProfile, selectProfileStatus } from '../../redux/slice/profileSlice'
import fileService from '../../services/fileService'
import removeDateFromFilename from '../../helpers/removeDateFromFilename'

export const EmployerProfileEdit = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { countries } = useAppSelector((state) => state.countries)
  const { profile } = useAppSelector((state) => state.profile)
  const profileQueryStatus = useSelector(selectProfileStatus)
  const navigate = useNavigate()
  console.log(profile)

  const {
    handleSubmit,
    control,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm<TDataProfile>({ defaultValues: {} })

  type TDataProfile = {
    aboutCompany: string
    address: string
    city: string
    companyName: string
    country: { label: string; value: string }
    email: string
    phoneNumber: string
    logo: FileList
  }

  const onSubmit = async (data: TDataProfile) => {
    const obj = {
      aboutCompany: data.aboutCompany,
      address: data.address,
      city: data.city,
      companyName: data.companyName,
      country: data.country.value,
      email: data.email,
      phoneNumber: data.phoneNumber,
    }

    const file = new FormData()
    file.append('file', data.logo[0])
    const dataResponse = await employerService.updateProfile(obj)
    const logoResponse = await fileService.updateLogo(file)
    console.log(dataResponse, logoResponse)
    navigate('/employer/')
  }

  useEffect(() => {
    dispatch(getCountries())
    dispatch(getProfile())
  }, [dispatch])

  useEffect(() => {
    ;(async () => {
      if (profileQueryStatus === 'fulfilled' && profile) {
        const fetchedLogo = await fetch(profile.fileResponse.path) // fetch the logo...
        const logoBlob = await fetchedLogo.blob() // ... make it a blob, then make it a file
        const newName = removeDateFromFilename(profile.fileResponse.name)
        const logoFile = new File([logoBlob], newName, {
          type: 'image/png',
        })
        const logoContainer = new DataTransfer()
        logoContainer.items.add(logoFile) //... then make it a filelist and in reset make it logo's value
        reset({ ...profile, logo: logoContainer.files })
      }
    })()
  }, [profile, profileQueryStatus, reset])

  const handleCancel = () => {
    navigate('/employer/')
  }

  let logoValue = { name: 'Файл не выбран' }

  const pictureArray = watch('logo')
  if (pictureArray && pictureArray[0]) {
    logoValue = pictureArray[0]
  }

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <p className="mainTitle">Мой профиль</p>

        <div className="form__sectionStart">
          <p className="form__subtitle subtitle">
            Наименование компании<span className="asterisk">*</span>
          </p>
          <input
            className="input text"
            type="text"
            placeholder="Например: Fortylines IO"
            {...register('companyName', { required: true })}
          />
          {errors.companyName?.type === 'required' && (
            <p className="errorMessage form__errorMessage">Пожалуйста введите название компании</p>
          )}
        </div>

        <div className="form__sectionStart">
          <p className="form__subtitle subtitle">Логотип</p>

          <input id="logo" className="hidden" type="file" accept="image/*" {...register('logo')} />
          <label htmlFor="logo" className="input input--file">
            <p className="input__text">{logoValue.name}</p>
          </label>
          {/* <input className='input text' type="text" {...register("logo")} />             */}
        </div>

        <div className="form__sectionStart">
          <p className="form__subtitle subtitle">
            О компании<span className="asterisk">*</span>
          </p>
          <Controller
            name="aboutCompany"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <InputFlexible onChange={onChange} value={value} id="aboutCompany" />
            )}
          />
          {errors.aboutCompany?.type === 'required' && (
            <p className="errorMessage form__errorMessage">Пожалуйста введите данные о компании</p>
          )}
        </div>

        <div className="form__sectionStart">
          <p className="form__subtitle subtitle">
            Страна<span className="asterisk">*</span>
          </p>
          <Controller
            name="country"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="-Выберите-"
                options={countries}
                styles={inputStyles}
              />
            )}
          />
          {errors.country?.type === 'required' && (
            <p className="errorMessage form__errorMessage">Пожалуйста выберите страну</p>
          )}
        </div>

        <div className="form__sectionStart">
          <p className="form__subtitle subtitle">
            Город<span className="asterisk">*</span>
          </p>
          <input
            className="input text"
            type="text"
            placeholder="Бишкек"
            {...register('city', { required: true })}
          />
          {errors.city?.type === 'required' && (
            <p className="errorMessage form__errorMessage">Пожалуйста введите название города</p>
          )}
        </div>

        <div className="form__sectionStart">
          <p className="form__subtitle subtitle">Адрес</p>
          <Controller
            name="address"
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputFlexible onChange={onChange} value={value} id="address" />
            )}
          />
        </div>

        <div className="form__sectionStart">
          <p className="form__subtitle subtitle">Электронная почта</p>
          <input
            className="input text"
            type="text"
            placeholder="username@mail.com"
            {...register('email')}
          />
        </div>

        <div className="form__sectionStart">
          <p className="form__subtitle subtitle">Телефон</p>
          <input
            className="input text"
            type="text"
            placeholder="+996 500 505050"
            {...register('phoneNumber')}
          />
        </div>

        <div className="form__submitButtons">
          <button className="button button--submit" type="submit">
            Сохранить
          </button>
        </div>
      </form>
    </div>
  )
}
