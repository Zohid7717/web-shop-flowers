import { FC } from 'react'
import UContainer from '../../component/ui/UContainer/UContainer'
import RegAdminForm from '../../component/regAdminForm/RegAdminForm'
import './RegAdmin.scss'
import BreadCrumbs from '../../component/Breadcrumbs/BreadCrumbs'

const RegAdmin: FC = () => {
  return <div className='register'>
    <UContainer>
      <div className="register__wrap">
        <div className="mobile-crumb">
          <BreadCrumbs />
        </div>
        <div className="register__menu">
          <p className='register__title'>Регистрация Аминистратора</p>
        </div>
        <div className="register__main">
          <div className="desctop-crumb">
            <BreadCrumbs />
          </div>
          <RegAdminForm />
        </div>
      </div>
    </UContainer>
  </div>
}

export default RegAdmin