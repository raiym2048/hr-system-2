import '../../pages/respondingCandidates/RespondingCandidates.scss'
import { BsCheck, BsFillCaretDownFill } from 'react-icons/bs'
import { RxCross2 } from 'react-icons/rx'
import { Button } from '../../components/ui/Button/Button'
import { getFetchCandidates, putCandidatesStatus} from '../../redux/slice/candidatesStatus'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store/store'
import PopupVacancies from '../../components/popup/popupVacancies/PopupVacancies'
import PopupInvite from '../../components/popup/popupInvite/PopupInvite'
import PopupAccept from '../../components/popup/popupAccept/PopupAccept'

function RespondingCandidatesCard() {
  const [status, setStatus] = useState('')
  const [usersId, setUsersId] = useState(0)
  const [modalReject, setModalReject] = useState(false)
  const [modalInvite, setModalInvite] = useState(false)
  const [modalAccept, setModalAccept] = useState(false)
  const [closeModal, setCloseModal] = useState(true)
  const dispatch = useAppDispatch()

  const candidatesPage = useAppSelector((state) => state.candidatesStatus.candidatesVacancies)
  const vacancyId = useAppSelector((state) => state.allVacancies.vacancies)

  console.log(status)

  const result = vacancyId.map((items) => {
    return Number(items.id)
  })

  useEffect(() => {
    dispatch(getFetchCandidates(vacanciesId))
  }, [])


  const vacanciesId = Number(result)

  const btnInvite = async () => {
    setStatus('собеседование')
    if (status === 'собеседование') {
      await dispatch(putCandidatesStatus({ status, vacanciesId, usersId }))
      await dispatch(getFetchCandidates(vacanciesId))
      setModalInvite(false)
      setUsersId(0)
    } else {
      console.log('error')
    }
  }

  const btnReject = async () => {
    setStatus('отклонено')
    if (status === 'отклонено') {
      await dispatch(putCandidatesStatus({ status, vacanciesId, usersId }))
      await dispatch(getFetchCandidates(vacanciesId))
      setModalReject(false)
      setUsersId(0)
    }
    console.log('error')
  }

  const btnAccept = async () => {
    setStatus('принято')
    console.log(status)
    if (status === 'принято') {
      await dispatch(putCandidatesStatus({ status, vacanciesId, usersId }))
      await dispatch(getFetchCandidates(vacanciesId))
      setModalAccept(false)
      setUsersId(0)
    }
  }
  const rejectPopup = () => {
    setStatus('отклонено')
    setModalReject(true)
    setCloseModal(false)
  }

  const acceptPopup = () => {
    setStatus('принято')
    setModalAccept(true)
    setCloseModal(false)
  }
  const reject = () => {
    setStatus('отклонено')
    setModalReject(true)
    setCloseModal(false)
  }

  const invitePopup = () => {
    setStatus('собеседование')
    setModalInvite(true)
    setCloseModal(false)
  }

  const accept = (id: any) => {
    setUsersId(id)
    if (usersId === id) {
      setStatus('рассматривается')
      dispatch(putCandidatesStatus({ status, id, usersId }))
    }
    console.log('error')
  }

  const clickStatus = (id: any) => {
    setUsersId((prev: any) => {
      return prev ? null : id
    })
    setCloseModal(true)
  }

  return (
    <div>
      {modalReject ? (
        <PopupVacancies
          btnReject={btnReject}
          setUsersId={setUsersId}
          setModalReject={setModalReject}
        />
      ) : (
        ''
      )}
      {modalInvite ? <PopupInvite btnInvite={btnInvite} setModalInvite={setModalInvite}/> : ''}
      {modalAccept ? <PopupAccept btnAccept={btnAccept} setModalAccept={setModalAccept} /> : ''}
      <div className="cardCandidates">
        {candidatesPage.map((item: any, i: number) => (
          <div key={i} className="candidatesVacanciesCont">
            <ul className="position">
              <li>ФИО кандидата </li>
              <span className="positionUser">
                {item?.firstname}
                {item?.lastname}
              </span>
            </ul>
            <ul className="position">
              <li>позиция</li>
              <span>{item?.position}</span>
            </ul>
            <ul className="position">
              <li>Отрасль</li>
              <span>{item?.category} </span>
            </ul>
            <ul className="position">
              <li>Опыт работы</li>
              <span>{item?.experience}</span>
            </ul>
            <ul className="position">
              <li>локация</li>

              <span>
                {item?.country} {item?.city}
              </span>
            </ul>
            <ul className="position">
              <li>Дата заявки</li>
              <span>{item?.localDate}</span>
            </ul>
            <ul className="position">
              {item?.statusOfJobSeeker === null ? (
                <div className="status">
                  <Button onClick={() => accept(item.id)} className="btnCandidatesVacanciesAccept">
                    Принять
                    <span>
                      <BsCheck />
                    </span>
                  </Button>
                  <Button onClick={reject} className="btnCandidatesVacanciesReject">
                    Отклонить
                    <span>
                      <RxCross2 />
                    </span>
                  </Button>
                </div>
              ) : (
                <div className="status">
                  <div className="btnStatusCandidates">
                    <Button
                      onClick={() => clickStatus(item.id)}
                      className={`${
                        item?.statusOfJobSeeker === 'рассматривается'
                          ? 'btnDynamic'
                          : item?.statusOfJobSeeker === 'отклонено'
                          ? 'btnDynamicReject'
                          : item?.statusOfJobSeeker === 'собеседование'
                          ? 'btnDynamicStatus'
                          : item?.statusOfJobSeeker === 'принято'
                          ? 'btnDynamicAccept'
                          : ''
                      }`}
                    >
                      {item?.statusOfJobSeeker}
                      <span>
                        <BsFillCaretDownFill />
                      </span>
                    </Button>
                  </div>
                </div>
              )}
              {usersId === item?.id && item?.statusOfJobSeeker === 'рассматривается' ? (
                <div className={closeModal ? 'btnStatusUser' : 'none'}>
                  <span onClick={invitePopup}>Пригласить</span>
                  <span onClick={rejectPopup}>Отклонить</span>
                </div>
              ) : usersId === item?.id && item?.statusOfJobSeeker === 'собеседование' ? (
                <div className={closeModal ? 'btnStatusUser' : 'none'}>
                  <span onClick={acceptPopup}>принято</span>
                  <span onClick={rejectPopup}>Отклонить</span>
                </div>
              ) : usersId === item?.id && item?.statusOfJobSeeker === 'отклонено' ? (
                <div className={closeModal ? 'btnStatusUser' : 'none'}>
                  <span onClick={invitePopup}>Пригласить</span>
                  <span onClick={rejectPopup}>Отклонить</span>
                </div>
              ) : usersId === item?.id && item?.statusOfJobSeeker === 'принято' ? (
                <div className={closeModal ? 'btnStatusUser' : 'none'}>
                  <span onClick={invitePopup}>Пригласить</span>
                  <span onClick={rejectPopup}>Отклонить</span>
                </div>
              ) : (
                ''
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RespondingCandidatesCard
