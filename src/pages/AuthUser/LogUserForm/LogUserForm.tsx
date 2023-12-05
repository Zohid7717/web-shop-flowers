import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../service/redux/hooks/hooks'
import { loginUser } from '../../../service/redux/Slices/auth/slice'

interface LogAdminFormType{
  nickname: string;
  password: string;
}

const LogUserForm: FC = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(state => state.auth.status)
  console.log(status)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<LogAdminFormType>({
    mode: 'onChange'
  })

  const onSubmit = handleSubmit((data) => {
    dispatch(loginUser(data))
    navigate('/user')
    reset()
  })

  const onCancel = () => {
    reset()
    navigate('/')
  }

  return <div className='reg-form'>
    <p className="reg-form__title">Форма для регистрации администратора</p>
    <form className="reg-form__form" onSubmit={onSubmit} autoComplete='off'>
      <div className="reg-form__inputs">
        <label className='reg-form__nickname'>
          Введите псевдоним
          <input
            placeholder='MyNickName'
            className='reg-form__input'
            {...register("nickname", {
              required: "Поля обязательно к заполнению",
            })}
          />
          <div className="reg-form__error">
            {errors?.nickname && <p>{errors.nickname?.message || "Error!"}</p>}
          </div>
        </label>
        <label className='reg-form__password'>
          Введите парол
          <input
            placeholder='Пароль из 8 символов'
            className='reg-form__input'
            {...register("password", {
              required: "Поля обязательно к заполнению.",
              minLength: {
                value: 8,
                message: 'Минимальная число сомволов 8.'
              }
            })}
          />
          <div className="reg-form__error">
            {errors?.password && <p>{errors.password?.message || "Error!"}</p>}
          </div>
        </label>
      </div>
      <div className="reg-form__btn">
        <button onClick={onCancel} className='UBtn reg-form__btn' type='reset'>
          Отмена
        </button>
        <button className={isValid ? 'UBtn-active reg-form__btn' : 'UBtn-disable reg-form__btn' } type='submit' disabled={!isValid}>
          Регистрация
        </button>
      </div>
    </form>
  </div>
}

export default LogUserForm