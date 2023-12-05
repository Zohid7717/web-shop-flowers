import { FC, useState, useEffect } from 'react'
import UContainer from '../../component/ui/UContainer/UContainer'
import BreadCrumbs from '../../component/Breadcrumbs/BreadCrumbs'
import { useAppSelector } from '../../service/redux/hooks/hooks'
import editIcon from '../../assets/icon/edit-icon.svg'

import './Cabinet.scss'
import Discont from './Discount/Discount'

const doorHangers = [
  { title: 'info' },
  { title: 'setting' },
  { title: 'bouquet' },
  { title: 'gift' },
  { title: 'orders' },
]

const Cabinet: FC = () => {
  const Admin = useAppSelector(state => state.auth.user?.admin)
  const [activeDoor, setActiveDoor] = useState('info')

  useEffect(() => {
    console.log(Admin)
  }, [Admin])
  return <div className='register'>
    <UContainer>
      <div className="register__wrap">
        <div className="mobile-crumb">
          <BreadCrumbs />
        </div>
        <div className="register__menu">
          <p className='register__title'>Личный кабинет</p>
          <div className="user-menu">
            <div className={
              activeDoor === 'info' || activeDoor === 'setting' ?
                "user-menu__settings activeDoor" :
                "user-menu__settings"
            }>
              <button onClick={() => setActiveDoor('info')} >Профиль</button>
              <button className="user-menu__set" onClick={() => setActiveDoor('setting')} >
                <img src={editIcon} alt="edit-icon" />
              </button>
            </div>
            {Admin ? <div className={activeDoor === 'bouquet' ? 'activeDoor' : ''}>
              <button onClick={() => setActiveDoor('bouquet')} >
                Добавить букет
              </button>
            </div> : ''}
            {Admin ?
              <div className={activeDoor === 'gift' ? 'activeDoor' : ''}>
                <button onClick={() => setActiveDoor('gift')} >
                  Добавить подарок
                </button>
              </div> :
              <div className={activeDoor === 'orders' ? 'activeDoor' : ''}>
                <button onClick={() => setActiveDoor('orders')} >
                  Мои заказы
                </button>
              </div>
            }
          </div>
        </div>
        <div className="register__main">
          <div className="desktop-crumb">
            <BreadCrumbs />
          </div>
          <Discont/>
        </div>
      </div>
    </UContainer>
  </div>
}

export default Cabinet