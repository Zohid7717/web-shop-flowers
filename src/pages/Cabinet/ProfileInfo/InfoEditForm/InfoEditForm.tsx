import { Dispatch, FC, SetStateAction, SyntheticEvent, useState } from 'react'
import { UserResType } from '../../../../utils/types'
import { useForm } from "react-hook-form";
import '../ProfileInfo.scss'
import { useNavigate } from 'react-router-dom';

interface UserType {
  user: UserResType;
  setEditUserInfo: Dispatch<SetStateAction<boolean>>;
}

const InfoEditForm: FC<UserType> = ({ user, setEditUserInfo }) => {
  const [username, setUsername] = useState(user.username)
  const [nickname, setNickname] = useState(user.nickname)
  const [tel, setTel] = useState(user.tel)
  const [ccn, setCcn] = useState<number | null>(user.ccn ?? null)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid }
  } = useForm({
    mode: "onChange"
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  const onCancel = () => {
    reset()
    setEditUserInfo(false)
    navigate('/user/info')
  }

  const handlePhoneChange = (e: SyntheticEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value
    value = value.replace(/\D/g, "")
    if (value.length > 4) {
      value = value.replace(/^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/, "+998 $2 $3 $4 $5")
    }
    setValue("tel", value)
    setTel(value)
  }

  const handleUsernameChange = (e: SyntheticEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value
    setValue("username", value)
    setUsername(value)
  }
  const handleNicknameChange = (e: SyntheticEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value
    setValue("nickname", value)
    setNickname(value)
  }
  const handleCcnChange = (e: SyntheticEvent<HTMLInputElement>) => {
    let value: number = parseInt(e.currentTarget.value, 10)
    setValue("ccn", value)
    setCcn(value)
  }


  return <form className='info-box' onSubmit={onSubmit}>
    <label className="info-box__wrap">
      <p className='info-box__title'>Имя и фамилия</p>
      <input
        className='info-box__input'
        type='text'
        value={username}
        {...register("username", {
          required: "Поля обязательна к заполнению",
          pattern: {
            value: /^[a-zA-Zа-яА-ЯёЁ]+\s[a-zA-Zа-яА-ЯёЁ]+$/,
            message: "Введите имя и фамилию через пробел."
          }
        })}
        onChange={handleUsernameChange}
      />
      {errors?.username && <p>{typeof errors.username.message === "string" ? errors.username.message : "Error"}</p>}
    </label>
    <label className="info-box__wrap">
      <p className='info-box__title'>Моб. номер</p>
      <input
        className='info-box__input'
        value={tel}
        {...register("tel", {
          required: "Поля обязательно к заполнению.",
          pattern: {
            value: /^\+998\s\d{2}\s\d{3}\s\d{2}\s\d{2}$/,
            message: "Введите номер телефона в формате 998 XX XXX XX XX"
          },
        })}
        onChange={handlePhoneChange}
      />
    </label>
    <label className="info-box__wrap">
      <p className='info-box__title'>Мой псевдоним</p>
      <input
        className='info-box__input'
        type='text'
        value={nickname}
        {...register("nickname", {
          required: "Поля обязательно к заполнению."
        })}
        onChange={handleNicknameChange}
      />
    </label>
    <label className="info-box__wrap">
      <p className='info-box__title'>Данные о карте</p>
      <input
        className='info-box__input'
        value={ccn !== null ? ccn : ''}
        {...register("ccn", {
          minLength: {
            value: 16,
            message: 'Минимальная количевство цифр должно быть 16.'
          },
          maxLength: {
            value: 16,
            message: 'Максимальное количевство цифр должно быть 16.'
          }
        })}
        onChange={handleCcnChange}
      />
    </label>
    <div className="reg-form__btn">
      <button onClick={onCancel} className='UBtn reg-form__btn' type='reset'>
        Отмена
      </button>
      <button type='submit' className={isValid ? 'UBtn-active reg-form__btn' : 'UBtn-disable reg-form__btn'} disabled={!isValid}>
        Регистрация
      </button>
    </div>
  </form>
}

export default InfoEditForm