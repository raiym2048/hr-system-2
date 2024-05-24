import { AiOutlineClose } from 'react-icons/ai'
import { Button } from '../../ui/Button/Button'
import './PopupInvite.scss'

function PopupInvite({ btnInvite, setModalInvite }: any) {
  const clickInvite = () => {
    btnInvite()
  }
  return (
    <div className="modalInvite">
      <div className="fonModal"></div>
      <div className="modalContainer">
        <div className='containerIcon'>
          <span onClick={() => setModalInvite(false)} className="iconClose">
            <AiOutlineClose />
          </span>
        </div>

        <div className="modalContent">
          <h2>Пригласить на собеседование</h2>
          <div className="modalText">
            <p>Добрый день, Аман</p>
            <p>
              Мы хотим пригласить вас на собеседование в нашей компании. Мы впечатлены вашим резюме
              и хотели бы обсудить ваш потенциал. Пожалуйста, подтвердите доступность на [дата] в
              [время]. Мы с нетерпением ждем встречи с вами!
            </p>
            <p>
              С наилучшими пожеланиями, Алия Асанова
              <br />
              Fortylines IO
              <br /> +996 (700) 01 02 03
            </p>
          </div>
        </div>
        <div onClick={() => alert('клик')} className="lineModal">
          <p>Загрузить файл (doc, pdf)</p>
        </div>
        <div className="btnContainer">
          <Button onClick={() => clickInvite()} className="btnModalInvite">
            Пригласить
          </Button>
        </div>
      </div>
    </div>
  )
}
export default PopupInvite
