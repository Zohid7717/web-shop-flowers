import { FC, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../service/redux/hooks/hooks'
import { logout } from '../../../service/redux/Slices/auth/slice'
import './UserNav.scss'

type funcType = {
  handleViewerUM: () => void
}

const UserNav: FC<funcType> = ({ handleViewerUM }) => {
  const [auth, setAuth] = useState(false)
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handlerLogout = () => {
    dispatch(logout())
    window.localStorage.removeItem('token')
    handleViewerUM()
    navigate('/')
  }
  useEffect(() => {
    setAuth(isAuth)
  }, [isAuth])
  return <div>
    {auth ?
      <div className='header-main__menu-user'>
        <Link to='/user' onClick={handleViewerUM}>КАБИНЕТ</Link>
        <button onClick={handlerLogout}>ВЫХОД</button>
      </div> :
      <div className='header-main__menu-user'>
        <Link to='/user/login' onClick={handleViewerUM}>АВТОРИЗАЦИЯ</Link>
        <Link to='/user/register' onClick={handleViewerUM}>РЕГИСТРАЦИЯ</Link>
      </div>
    }
  </div>
}

export default UserNav