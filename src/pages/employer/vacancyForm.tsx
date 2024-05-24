import { useState, useEffect } from 'react'
import employerService from '../../services/employerService'
import account from '../../assets/account_circle.svg'
import { InputFlexible } from '../../components/reusable/inputFlexible'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import { inputStyles } from '../../app/style/vendors/_select'
import { getCountries } from '../../redux/slice/countrySlice'
import type { AppDispatch } from '../../redux/store/store'
import { useLocation, useParams } from 'react-router-dom'
import { useAppSelector } from '../../redux/store/store'
import { selectVacancyStatus } from '../../redux/slice/vacancyByIdSlice'
import { useSelector } from 'react-redux'
import { getVacancyById } from '../../redux/slice/vacancyByIdSlice'
import { prepareForForm } from '../../helpers/vacancyDataConverter'
import { useNavigate } from 'react-router-dom'
import {
  getExperience,
  getPositions,
  // getIndustries,
  getCategory,
  getSalaryType,
  getCurrency,
  getEmploymentType,
} from '../../redux/slice/employerSlice'
import { TFetchedEmployerProfileInfo } from '../../exportedTypes/fetchedEmployerProfileInfo'

export type TData = {
  about_company: string
  position: { value: string; label?: string }
  customPosition?: string
  industry: { value: string; label?: string }
  description: string
  skills: string
  salaryType: { value: string; label?: string }
  salarySum: string
  salaryCurrency: { value: string; label?: string }
  employmentType: { value: string; label?: string }
  experience: string
  country: { value: string; label?: string }
  city: string
  street_house: string
  additionalInformation: string
}

export const VacancyForm = () => {
  const { vacancy } = useAppSelector((state) => state.vacancy)
  const vacancyQueryStatus = useSelector(selectVacancyStatus)
  const dispatch = useDispatch<AppDispatch>()
  const [customPositionBool, setCustomPositionBool] = useState(false)
  const [profileInfo, setProfileInfo] = useState<TFetchedEmployerProfileInfo | null>(null)
  const [editMode, setEditMode] = useState(false)
  const { countries } = useAppSelector((state) => state.countries)
  const location = useLocation()
  const params = useParams()
  const navigate = useNavigate()
  const {
    positions,
    experiences,
    category,
    // industries,
    salaryType,
    currency,
    employmentType,
  } = useAppSelector((state) => state.employer)

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm<TData>({ defaultValues: {} })

  useEffect(() => {
    ;(async () => {
      const response = await employerService.getProfile()
      setProfileInfo(response)
    })()

    dispatch(getPositions())
    dispatch(getExperience())
    dispatch(getCategory())
    dispatch(getSalaryType())
    dispatch(getCurrency())
    dispatch(getEmploymentType())
    dispatch(getCountries())

    if (location.pathname.includes('/employer/vacancy/edit/') && params.vacancyId) {
      setEditMode(true)
      dispatch(getVacancyById(params.vacancyId))
    }
  }, [dispatch, location.pathname, params.vacancyId])

  useEffect(() => {
    if (vacancyQueryStatus === 'fulfilled' && vacancy) {
      reset(prepareForForm(vacancy))
    }
  }, [reset, vacancy, vacancyQueryStatus])

  const onSubmit = async (data: TData) => {
    const newObj = {
      about_company: data.about_company,
      position: customPositionBool ? data.customPosition : data.position.value,
      industry: data.industry.value,
      description: data.description,
      skills: data.skills,
      salaryResponse: {
        salaryType: data.salaryType.value,
        salarySum: data.salarySum,
        valute: data.salaryCurrency.value,
      },
      typeOfEmploymentS: data.employmentType.value,
      experience: data.experience,
      contactInformationResponse: {
        country: data.country.value,
        city: data.city,
        street_house: data.street_house,
      },
      additionalInformation: data.additionalInformation,
    }

    if (editMode && params.vacancyId) {
      const result = await employerService.updateVacancy(newObj, params.vacancyId)
      console.log(result)
      navigate(`/employer/vacancy/${params.vacancyId}`)
    } else {
      const result = await employerService.addVacancy(newObj)
      console.log(result)
      navigate(`/employer/vacancy/${result.id}`)
    }
  }

  const handleCancel = () => {
    navigate('/')
  }
  // console.log(vacancy);

  return (
    <div className="container">
      {!profileInfo ? (
        <p className="pendingMessage">Waiting for data</p>
      ) : (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <p className="mainTitle">
            {editMode ? 'Редактирование объявления о вакансии' : 'Добавление новой вакансии'}
          </p>

          <div className="brandGroup brandGroup--farther">
            <img className="brandGroup__pic" src={profileInfo.fileResponse?.path || account}></img>
            {profileInfo.companyName ? (
              <p className="brandGroup__text">{profileInfo.companyName}</p>
            ) : (
              <p className=" brandGroup__text brandGroup__text--noName">
                Название компании не указано
              </p>
            )}
          </div>

          <div className="form__sectionStart">
            <p className="form__subtitle subtitle">
              О компании<span className="asterisk">*</span>
            </p>
            <Controller
              name="about_company"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <InputFlexible onChange={onChange} value={value} id="about_company" />
              )}
            />
            {errors.about_company?.type === 'required' && (
              <p className="errorMessage form__errorMessage">
                Пожалуйста введите данные о компании
              </p>
            )}
          </div>

          <div className="form__sectionStart">
            <p className="form__subtitle subtitle">
              Позиция<span className="asterisk">*</span>
            </p>
            <Controller
              name="position"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  isDisabled={customPositionBool}
                  // defaultValue={defaultValue}
                  placeholder="-Выберите-"
                  options={positions}
                  styles={inputStyles}
                />
              )}
            />
            {errors.position?.type === 'required' && !customPositionBool && (
              <p className="errorMessage form__errorMessage">Пожалуйста выберите позицию</p>
            )}

            <div className="checkboxGroup form__checkbox">
              <div
                className={`checkboxGroup__checkbox ${
                  customPositionBool ? 'checkboxGroup__checkbox--checked' : ''
                }`}
              ></div>
              <input
                id="customPositionBool"
                type="checkbox"
                name="customPosition"
                checked={customPositionBool}
                onChange={() => setCustomPositionBool(!customPositionBool)}
              />
              <label htmlFor="customPositionBool">Нужная позиция отсутствует в списке</label>
            </div>

            <input
              style={{ display: customPositionBool ? '' : 'none' }}
              placeholder="Напишите вручную. Например: Junior Frontend разработчик"
              className="input"
              type="text"
              {...register('customPosition', { required: customPositionBool ? true : false })}
            />
            {errors.customPosition?.type === 'required' && customPositionBool && (
              <p className="errorMessage form__errorMessage">Пожалуйста укажите позицию</p>
            )}
          </div>

          <div className="form__sectionStart">
            <p className="form__subtitle subtitle">
              Отрасль<span className="asterisk">*</span>
            </p>
            <Controller
              name="industry"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="-Выберите-"
                  options={category}
                  styles={inputStyles}
                />
              )}
            />
          </div>
          {errors.industry?.type === 'required' && (
            <p className="errorMessage form__errorMessage">Пожалуйста выберите отрасль</p>
          )}

          <div className="form__sectionStart">
            <p className="form__subtitle subtitle">
              Описание к вакансии<span className="asterisk">*</span>
            </p>
            <Controller
              name="description"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <InputFlexible onChange={onChange} value={value} id="description" />
              )}
            />
          </div>
          {errors.description?.type === 'required' && (
            <p className="errorMessage form__errorMessage">Пожалуйста опишите вакансию</p>
          )}

          <div className="form__sectionStart">
            <p className="form__subtitle subtitle">
              Требуемые навыки<span className="asterisk">*</span>
            </p>
            <Controller
              name="skills"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <InputFlexible onChange={onChange} value={value} id="skills" />
              )}
            />
          </div>
          {errors.skills?.type === 'required' && (
            <p className="errorMessage form__errorMessage">Пожалуйста укажите требуемые навыки</p>
          )}

          <div className="form__sectionStart">
            <p className="form__subtitle subtitle">
              Оклад<span className="asterisk">*</span>
            </p>
            <div className="form__grid form__grid--bigBigSmall">
              <Controller
                name="salaryType"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder="-Выберите-"
                    options={salaryType}
                    styles={inputStyles}
                  />
                )}
              />

              <input className="input" type="number" {...register('salarySum')} />

              <Controller
                name="salaryCurrency"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder="-Выберите-"
                    options={currency}
                    styles={inputStyles}
                  />
                )}
              />
            </div>
            {(errors.salaryType?.type === 'required' ||
              errors.salarySum?.type === 'required' ||
              errors.salaryCurrency?.type === 'required') && (
              <p className="errorMessage form__errorMessage">Пожалуйста заполните поля</p>
            )}
          </div>

          <div className="form__sectionStart">
            <p className="form__subtitle subtitle">
              Вид занятости<span className="asterisk">*</span>
            </p>
            <Controller
              name="employmentType"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="-Выберите-"
                  options={employmentType}
                  styles={inputStyles}
                />
              )}
            />
            {errors.employmentType?.type === 'required' && (
              <p className="errorMessage form__errorMessage">Пожалуйста выберите вид занятости</p>
            )}
          </div>

          <div className="form__sectionStart form__sectionStart--radio">
            <p className="form__subtitle subtitle">
              Опыт работы/стаж<span className="asterisk">*</span>
            </p>
            <div className="radioButtons">
              {experiences.map((item, index) => {
                return (
                  <div className="radioButtons__row" key={index}>
                    <input
                      {...register('experience')}
                      type="radio"
                      id={`experience${index}`}
                      value={item.label}
                      // onChange={(event) => setExperience(event?.target.value)}
                    />
                    <span className="radioButtons__customRadio"></span>
                    <label htmlFor={`experience${index}`}>{item.label}</label>
                  </div>
                )
              })}
            </div>
            {errors.experience?.type === 'required' && (
              <p className="errorMessage form__errorMessage">Пожалуйста выберите опыт работы</p>
            )}
          </div>

          <div className="form__sectionStart">
            <p className="form__subtitle subtitle">Контактная информация</p>
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

            <input
              className="input form__singleInput text"
              type="text"
              placeholder="Город"
              {...register('city')}
            />

            <input
              className="input form__singleInput text"
              type="text"
              placeholder="Улица"
              {...register('street_house')}
            />
          </div>

          <div className="form__sectionStart">
            <p className="form__subtitle subtitle">Дополнительная информация</p>
            <Controller
              name="additionalInformation"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <InputFlexible onChange={onChange} value={value} id="additionalInformation" />
              )}
            />
          </div>

          <div className="form__submitButtons">
            <button className="button button--submit" type="submit">
              {editMode ? 'Сохранить' : 'Разместить вакансию'}
            </button>
            <button className="button button--cancel" onClick={handleCancel}>
              Отмена
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
