import { FC, useEffect } from 'react'
import './Toast.scss'

interface ToastTypes {
  message: string,
  onClose: ()=>void
}

const Toast: FC<ToastTypes> = ({ message, onClose }) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      onClose()
    }, 10000)
    return ()=>clearTimeout(timeOut)
  }, [onClose])
  return <div className='toast'>
    <p>{message}</p>
    <button onClick={onClose}>Закрыть</button>
  </div>
}

export default Toast