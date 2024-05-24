import { classNames } from '../../../../utils/lib/classNames/classNames'
import cls from './CandidateSelector.module.scss'
import { Text } from '../../../../components/ui/Text/Text'
import { AiOutlineSearch } from 'react-icons/ai'
import { Select } from '../../../../components/ui/Select/Select'
import { Button, ButtonTheme } from '../../../../components/ui/Button/Button'
import { useAppDispatch, useAppSelector } from '../../../../redux/store/store'
import { useEffect, useState } from 'react'
import { getEducations, getExperience, getPositions } from '../../../../redux/slice/employerSlice'
import {
    fetchCandidateFilter,
    fetchCandidateList,
    fetchCandidateSearch
} from "../../services/fetchCandidateList";
import Input from "../../../../components/ui/Input/Input";
import { useDebounce } from 'usehooks-ts'
import { options } from '../../../../app/api/CityData/city'
import { getCountries } from '../../../../redux/slice/countrySlice'
interface CandidateSelectorProps {
  className?: string
}

const CandidateSelector = ({ className }: CandidateSelectorProps) => {
  const { countries } = useAppSelector((state) => state.countries)
  const { experiences, educations, positions } = useAppSelector((state) => state.employer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPositions())
    dispatch(getExperience())
    dispatch(getEducations())
    dispatch(getCountries())
  }, [dispatch])

  const [inputValue, setInputValue] = useState('')
  const [position, setPosition] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [experience, setExperience] = useState('')
  const [education, setEducation] = useState('')

  const handleChangeSearch = (value: string) => {
    setInputValue(value)
  }

  const handleChangePosition = (value: string) => {
    setPosition(value)
  }
  const handleChangeEducation = (value: string) => {
    setEducation(value)
  }
  const handleChangeCountry = (value: string) => {
    setCountry(value)
  }
  const handleChangeCity = (value: string) => {
    setCity(value)
  }
  const handleChangeExperience = (value: string) => {
    setExperience(value)
  }

  const filter: Record<string, string> = {
    position,
    education,
    country,
    city,
    experience,
  }

    useEffect(() => {
        const filterObject:Record<string, string>= {}
        Object.keys(filter).forEach((key) => {
            if (filter[key] && filter[key].trim().length > 0) {
                filterObject[key] = filter[key]
            } else {
                delete filterObject[key]
            }
        })
        if (Object.keys(filterObject).length > 0) {
            dispatch(fetchCandidateFilter(filterObject))
        }
    }, [position, country, city, experience, education])

  const debouncedValue = useDebounce<string>(inputValue, 1000)

    if (inputValue.trim().length > 0) {
        useEffect(() => {
            dispatch(fetchCandidateSearch(inputValue))
        }, [debouncedValue])
    } else {
        useEffect(() => {
            dispatch(fetchCandidateList())
        }, [dispatch])
    }


    const resetFilter = () => {
        setPosition('')
        setExperience('')
        setCity('')
        setCountry('')
        setInputValue('')
        setEducation('')
        dispatch(fetchCandidateList())
    }


  return (
    <div className={classNames(cls.CandidateSelector, {}, [className || ''])}>
      <div className={cls.candidate_selector__box}>
        <Text text={'Поиск кандидатов'} className={cls.candidate_text} />
        <div className={cls.SearchCandidate}>
          <span>
            <AiOutlineSearch />
          </span>
          <Input
            placeholder={'Поиск'}
            type={'text'}
            className={cls.SearchInput}
            value={inputValue}
            onChange={handleChangeSearch}
          />
        </div>
      </div>

      <div className={cls.candidate_selector__box}>
        <Text text={'Позиция'} className={cls.candidate_text} />
        <Select
          placeholder={'-Выберите-'}
          options={positions}
          value={position}
          onChange={handleChangePosition}
        />
      </div>
      <div className={cls.candidate_selector__box}>
        <Text text={'Образование'} className={cls.candidate_text} />
        <Select
          placeholder={'-Выберите-'}
          options={educations}
          value={education}
          onChange={handleChangeEducation}
        />
      </div>
      <div className={cls.candidate_selector__box}>
        <Text text={'Страна'} className={cls.candidate_text} />
        <Select
          placeholder={'-Выберите-'}
          options={countries}
          value={country}
          onChange={handleChangeCountry}
        />
      </div>
      <div className={cls.candidate_selector__box}>
        <Text text={'Город'} className={cls.candidate_text} />
        <Select
          placeholder={'-Выберите-'}
          options={options}
          value={city}
          onChange={handleChangeCity}
        />
      </div>
      <div className={cls.candidate_selector__box}>
        <Text text={'Опыт работы'} className={cls.candidate_text} />
        <Select
          placeholder={'-Выберите-'}
          options={experiences}
          value={experience}
          onChange={handleChangeExperience}
        />
      </div>

      <div className={cls.candidate_selector__btn}>
        <Button theme={ButtonTheme.CLEAR_BTN} onClick={resetFilter}>
          Сбросить
        </Button>
      </div>
    </div>
  )
}

export default CandidateSelector
