import { AiOutlineSearch } from 'react-icons/ai'
import './FilterRespondingCandidates.scss'
import { useEffect, useState } from 'react'
import { Button } from '../ui/Button/Button'
// import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../redux/store/store'
import { Select } from '../ui/Select/Select'
import {
  getFetchCandidates,
  getCandidatesSearch,
  getCandidatesFilter,
} from '../../redux/slice/candidatesStatus'

function FilterRespondingCandidates() {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const [value, setValue] = useState('')
  const [res, setResponse] = useState('')
  const [creation, setCreation] = useState('')
  const [status, setStatus] = useState('')

  const resData = [
    { label: 'нет опыта работы', value: 'нет опыта работы' },
    { label: 'до 1 года', value: 'до 1 года ' },
    { label: 'от 1 - 3 лет', value: 'от 1 - 3 лет' },
    { label: 'от 3 - 6 лет', value: 'от 3 - 6 лет' },
    { label: 'от 6 лет ', value: 'от 6 лет' },
  ]
  const creData = [
    { label: 'принято', value: 'принято' },
    { label: 'отклонено', value: 'отклонено' },
    { label: 'рассматривается', value: 'рассматривается' },
    { label: 'собеседование', value: 'собеседование' },
  ]
  const staData = [
    { label: 'Открыто', value: 'Открыто' },
    { label: 'Архиве', value: 'Архиве' },
    { label: 'Закрыто', value: 'Закрыто' },
  ]

  const user = useAppSelector((state) => state.authSlice.user)

  if (value.length > 0) {
    useEffect(() => {
      dispatch(getCandidatesSearch({ user, value }))
    }, [value])
  } else {
    useEffect(() => {
      dispatch(getFetchCandidates(user))
    }, [dispatch])
  }

  useEffect(() => {
    if (res.length > 0) {
      dispatch(getCandidatesFilter({ user, res, creation }))
    } else {
      null
    }
    if (creation.length > 0) {
      dispatch(getCandidatesFilter({ user, res, creation }))
    } else {
      null
    }
    if (status.length > 0) {
      dispatch(getCandidatesFilter({ user, res, creation }))
    } else {
      null
    }
  }, [res, creation, status])

  return (
    <div className="containerFilter">
      <div className="filterAllVacancies">
        <div className="filterBlog">
          <div className="filterAllVacanciesSearch">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text"
              placeholder="Поиск"
            />
            <span>
              <AiOutlineSearch />
            </span>
          </div>
          <Select
            className="select_filter"
            placeholder={'От 1 года до 3 лет '}
            options={resData}
            value={res}
            onChange={(value) => setResponse(value)}
          />
          <Select
            className="select_filter"
            placeholder={'В рассмотрении'}
            options={creData}
            value={creation}
            onChange={(value) => setCreation(value)}
          />
          <Select
            className="select_filter"
            placeholder={'Сегодня'}
            options={staData}
            value={status}
            onChange={(value) => setStatus(value)}
          />
          <Button className="btn">Сбросить</Button>
        </div>
      </div>
    </div>
  )
}

export default FilterRespondingCandidates
