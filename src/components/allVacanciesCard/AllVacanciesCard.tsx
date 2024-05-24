import { HiUserCircle } from 'react-icons/hi'
import { BsThreeDots } from 'react-icons/bs'
import { FiPlus } from 'react-icons/fi'
import { Button } from '../../components/ui/Button/Button'
import { useState } from 'react'
import './AllVacanciesCard.scss'
import { useAppDispatch, useAppSelector } from '../../redux/store/store'
import { putNewVacanciesStatus } from '../../redux/slice/allVacanciesSlice'
import Pagination from '../ui/Pagination/Pagination'
import { useNavigate } from 'react-router-dom'

function AllVacanciesCard() {
  const [chosenId, setChosenId] = useState(0)
  const isLoader = useAppSelector((state) => state.allVacancies.isLoader)
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.authSlice.user)
  const allVacancies = useAppSelector((state) => state.allVacancies.vacancies)

  console.log(allVacancies)
  const status = [
    { name: 'open', rusName: 'Открыто' },
    { name: 'archive', rusName: 'В архиве' },
    { name: 'closed', rusName: 'Закрыто' },
  ]

  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const totalItems = allVacancies.length
  const itemsPerPage = 4

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const displayedItems = allVacancies.slice(startIndex, endIndex)

  const clickStatus = (id: any) => {
    setChosenId((prev) => {
      return prev ? null : id
    })
  }

  const reset = () => {
    setChosenId(0)
  }

  const clickNewStatus = (item: any) => {
    dispatch(putNewVacanciesStatus({ newStatus: item.name, chosenId, user, reset })).then(setChosenId(0))
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  const candidatesPage = () => {
    navigate(`/employer/response/candidate`)
  }
  const clickEdit = (id: number) => {
    navigate(`/employer/vacancy/edit/${id}`)
  }
  const clickCardVacancies = () => {}

  return (
    <div className="allVacanciesCard">
      {isLoader ? (
        <div className="loaderVacancies">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="allVacanciesItems">
          {displayedItems.map((items: any, i: number) => (
            <div onClick={clickCardVacancies} key={i} className="allVacanciesCont">
              <ul className="position">
                <li>позиция</li>
                <span className="positionUser">{items.position}</span>
              </ul>
              <ul className="position">
                <li>Вид Занятости</li>
                <span>{items.typeOfEmploymentS}</span>
              </ul>
              <ul className="position">
                <li>Оклад</li>
                <span>{items.salary} Сом</span>
              </ul>
              <ul className="position">
                <li>Опыт работы</li>
                <span>{items.experience}</span>
              </ul>
              <ul className="position">
                <li>Отклики</li>
                <span onClick={() => candidatesPage()} className="borderVacancies">
                  <span>
                    <HiUserCircle />
                  </span>
                  <span>{items.respondedCount}</span>
                </span>
              </ul>
              <ul className="position">
                <li>Создано</li>
                <span>{items.creationDate}</span>
              </ul>
              <ul className="position">
                <div className="status">
                  <li>статус</li>

                  <Button
                    className={` ${
                      items.statusOfVacancy === 'Открыто'
                        ? 'btn_open'
                        : items.statusOfVacancy === 'Закрыто'
                        ? 'btn_close'
                        : 'btn_archive'
                    } `}
                  >
                    {items.statusOfVacancy}
                  </Button>
                </div>
              </ul>
              <ul className="position">
                <div className="borderContMenu">
                  <span onClick={() => clickStatus(items.id)} className="borderVacanciesMenu">
                    <BsThreeDots />
                  </span>
                  {chosenId === items.id ? (
                    <ul key={i} className="openBtn">
                      <li onClick={() => clickEdit(items.id)}>Редактировать</li>
                      {status.map((item: any, i: any) => (
                        <li key={i} onClick={() => clickNewStatus(item)}>
                          {item.rusName}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    ''
                  )}
                </div>
              </ul>
            </div>
          ))}

            <div className="paginationBtnAllVacancies">
              <Pagination
                currentPage={totalItems}
                totalPages={totalItems / itemsPerPage + 1}
                onPageChange={handlePageChange}
              />
            </div>

        </div>
      )}
      {displayedItems.length ? (
        ''
      ) : (
        <div className="vacanciesNo">
          <p>У вас нет никаких размещенных вакансий</p>
          <Button className="btnVacanciesNo">
            <span>
              <FiPlus />
            </span>
            Разместить
          </Button>
        </div>
      )}
    </div>
  )
}

export default AllVacanciesCard
