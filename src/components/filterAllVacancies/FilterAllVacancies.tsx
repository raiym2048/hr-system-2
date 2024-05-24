import { AiOutlineSearch } from 'react-icons/ai'
import './FilterAllVacancies.scss'
import { useEffect, useState } from 'react'
import { Button } from '../ui/Button/Button'
import { FiPlus } from 'react-icons/fi'

import { useNavigate } from 'react-router-dom'
import {
  getAllVacanciesFilter,
  getAllVacanciesSearch,
  getAllVacanciesStatus,
  getFetchVacancies,
} from '../../redux/slice/allVacanciesSlice'


import { useAppDispatch, useAppSelector } from '../../redux/store/store'
import { Select } from '../ui/Select/Select'

function FilterAllVacancies() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [searchVacancies, setSearchVacancies] = useState<string>('')
  const [res, setResponse] = useState('')
  const [creation, setCreation] = useState('')
  const [status, setStatus] = useState('')
  const resData = [
    { label: '0 - 20', value: '0 - 20' },
    { label: '21 - 50', value: '21 - 50' },
    { label: '51+', value: '51+' },
  ]
  const creData = [
    { label: 'cегодня', value: 'cегодня' },
    { label: 'На этой неделе', value: 'На этой неделе' },
    { label: 'На этой месяце', value: 'На этой месяце' },
    { label: 'В этом году', value: 'В этом году' },
  ]
  const staData = [
    { label: 'Открыто', value: 'Открыто' },
    { label: 'Архиве', value: 'Архиве' },
    { label: 'Закрыто', value: 'Закрыто' },
  ]

  const user = useAppSelector((state) => state.authSlice.user);

  const createVacancies = () => {
    navigate("/employer/vacancy/form");
  };
  useEffect(() => {
    if (searchVacancies.trim().length > 0) {
      dispatch(getAllVacanciesSearch({ searchVacancies, user }));
    } else {
      dispatch(getFetchVacancies(user));
      dispatch(getAllVacanciesStatus());
    }
  }, [searchVacancies, dispatch]);

  useEffect(() => {
    if (res.length > 0) {
      dispatch(getAllVacanciesFilter({ user, res, creation, status }));
    } else {
      null;
    }
    if (creation.length > 0) {
      dispatch(getAllVacanciesFilter({ user, res, creation, status }));
    } else {
      null;
    }
    if (status.length > 0) {
      dispatch(getAllVacanciesFilter({ user, res, creation, status }));
    } else {
      null;
    }
  }, [res, creation, status]);

  return (

    <div className="containerFilter">
      <div className="filterAllVacancies">
        <div className="filterBlog">
          <div className="filterAllVacanciesSearch">
            <input
              value={searchVacancies}
              onChange={(e) => setSearchVacancies(e.target.value)}
              type="text"
              placeholder="Поиск"
            />
            <span>
              <AiOutlineSearch />
            </span>
          </div>
          <Select
            className="select_filter"
            placeholder={'По количеству откликов '}
            options={resData}
            value={res}
            onChange={(value) => setResponse(value)}
          />
          <Select
            className="select_filter"
            placeholder={'По дате создания'}
            options={creData}
            value={creation}
            onChange={(value) => setCreation(value)}
          />
          <Select
            className="select_filter"
            placeholder={'По статусу'}
            options={staData}
            value={status}
            onChange={(value) => setStatus(value)}
          />
        </div>
        <div className="filterBtn">
          <span>
            <FiPlus />
          </span>
          <Button onClick={createVacancies} className="btnFilter">
            Создать
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FilterAllVacancies
