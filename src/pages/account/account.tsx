import { useState } from 'react';
import ChangePassword from './changePassword';
import DeleteAccount from './deleteAccount';
 
const Account = () => {
  const [chosenTab, setChosenTab] = useState<number>(1)

  return (
    <div className='container'>
      <div className='form' >
        <p className='mainTitle'>Настройки</p>

        <div className='form__tabs tabs'>
          <p 
            className={`tabs__menuItem ${chosenTab === 1 && 'tabs__menuItem--active'}`}
            onClick={() => setChosenTab(1)}>
              Смена пароля
          </p>
          <p 
            className={`tabs__menuItem ${chosenTab === 2 && 'tabs__menuItem--active'}`}
            onClick={() => setChosenTab(2)}>
              Удаление профиля
          </p>
        </div>
        <hr className='tabs__line'/>

        {chosenTab === 1 ?          
          <ChangePassword/> :
          <DeleteAccount/>
        }

      </div>
    </div>
  )
}
export default Account