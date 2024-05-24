import './PopupVacancies.scss'
import { AiOutlineClose } from 'react-icons/ai'
function PopupVacancies({ btnReject, setModalReject }: any) {
  const closeModal = () => {
    btnReject()
    setModalReject(false)
  }

  return (
    <div className="modalColor">
      <div className="modalControl"></div>
      <div className="modalPopup">
        <span onClick={() => setModalReject(false)}>
          <AiOutlineClose />
        </span>
        <div className="popup">
          <h2>Отклонить заявку</h2>
          <p>
            Вы уверены что хотите отклонить заявку? Дальнейшие действия по этой заявке будут
            недоступны.
          </p>
          <div className="btnPopup">
            <button onClick={closeModal} className="btnReject">
              Отклонить
            </button>
            <button onClick={() => setModalReject(false)} className="btnCancel">
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopupVacancies
