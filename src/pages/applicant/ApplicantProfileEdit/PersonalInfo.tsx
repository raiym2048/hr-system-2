import {
  Controller,
  Control,
  UseFormRegister,
  UseFormWatch,
  FieldErrors,
  UseFormReset,
} from 'react-hook-form'
import Select from 'react-select'
import { inputStyles } from '../../../app/style/vendors/_select'
import { useEffect } from 'react'
import { getCountries } from '../../../redux/slice/countrySlice'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '../../../redux/store/store'
import { InputFlexible } from '../../../components/reusable/inputFlexible'
import { TApplicantProfileData } from './ApplicantProfileEdit'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { ruRU } from '@mui/x-date-pickers/locales'
import { ThemeProvider, createTheme } from '@mui/material'

type TUseFormProps = {
  control: Control<TApplicantProfileData>
  reset: UseFormReset<TApplicantProfileData>
  watch: UseFormWatch<TApplicantProfileData>
  errors: FieldErrors<TApplicantProfileData>
  register: UseFormRegister<TApplicantProfileData>
}

const PersonalInfo = ({ control, watch, errors, register }: TUseFormProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const { countries } = useAppSelector((state) => state.countries)

  useEffect(() => {
    dispatch(getCountries())
  }, [dispatch])

  const muiTheme = createTheme(
    {
      typography: {
        fontFamily: `"Inter", "Helvetica", "Arial", sans-serif`,
        fontSize: 24,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
      },
      components: {
        MuiFormControl: {
          styleOverrides: {
            root: {
              width: '100%',
            },
          },
        },
        MuiInputBase: {
          styleOverrides: {
            root: {
              height: '6.7rem',
            },
          },
        },
      },
    },
    ruRU
  )

  let logoValue = { name: 'Файл не выбран' }

  const pictureArray = watch('logo')
  if (pictureArray && pictureArray[0]) {
    logoValue = pictureArray[0]
  }

  return (
    <>
      <div className="form__sectionStart">
        <p className="form__subtitle subtitle">Фото профиля</p>

        <input
          id="logo"
          className="hidden"
          type="file"
          accept="image/*"
          {...register('logo')}
        />
        <label htmlFor="logo" className="input input--file">
          <p className="input__text">{logoValue.name}</p>
        </label>
        {/* <input className='input text' type="text" {...register("logo")} />             */}
      </div>

      <div className="form__sectionStart">
        <p className="form__subtitle subtitle">
          Имя<span className="asterisk">*</span>
        </p>
        <input
          className="input text"
          type="text"
          placeholder="Например: Асан"
          {...register('firstname', { required: true })}
        />
        {errors.firstname?.type === 'required' && (
          <p className="errorMessage form__errorMessage">
            Пожалуйста введите имя
          </p>
        )}
      </div>

      <div className="form__sectionStart">
        <p className="form__subtitle subtitle">
          Фамилия<span className="asterisk">*</span>
        </p>
        <input
          className="input text"
          type="text"
          placeholder="Например: Асанов"
          {...register('lastname', { required: true })}
        />
        {errors.lastname?.type === 'required' && (
          <p className="errorMessage form__errorMessage">
            Пожалуйста введите фамилию
          </p>
        )}
      </div>

      <div className="form__sectionStart">
        <p className="form__subtitle subtitle">
          Дата рождения<span className="asterisk">*</span>
        </p>

        <Controller
          name="birthday"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <ThemeProvider theme={muiTheme}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="ru"
              >
                <DatePicker
                  {...field}
                  defaultValue={dayjs('2000-01-01T12:30')}
                />
              </LocalizationProvider>
            </ThemeProvider>
          )}
        />

        {errors.birthday?.type === 'required' && (
          <p className="errorMessage form__errorMessage">
            Пожалуйста введите дату рождения
          </p>
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
          <p className="errorMessage form__errorMessage">
            Пожалуйста выберите страну
          </p>
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
          <p className="errorMessage form__errorMessage">
            Пожалуйста введите название города
          </p>
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
        <p className="form__subtitle subtitle">
          Телефон<span className="asterisk">*</span>
        </p>
        <input
          className="input text"
          type="text"
          placeholder="+996 500 505050"
          {...register('phoneNumber')}
        />
      </div>

      {/* <div className='form__sectionStart'>
        <p className='form__subtitle subtitle'>Электронная почта</p>
        <input className='input text' type="text" placeholder='username@mail.com' {...register("email")} />          
      </div> */}
    </>
  )
}
export default PersonalInfo
