import { Button } from '../../ui/Button/Button'
import './PopupAccept.scss'

function PopupAccept({ setModalAccept, btnAccept }: any) {
  const clickAcceptBtn = () => {
    btnAccept()
  }
  const close = () => {
    setModalAccept(false)
  }

  return (
    <div className="popupAccept">
      <div className="popupAcceptFon"></div>
      <div className="popupAcceptContent">
        <Button onClick={clickAcceptBtn} className="btnAccept">
          Принять
        </Button>
        <Button onClick={close} className="btnReject">
          Отмена
        </Button>
      </div>
    </div>
  )
}

export default PopupAccept
