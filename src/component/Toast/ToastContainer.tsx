import { FC, useEffect, useState } from 'react'
import Toast from './Toast'
import { useAppSelector } from '../../service/redux/hooks/hooks'

const ToastContainer: FC = () => {
  const userStatus = useAppSelector(state => state.auth.status)
  const [toasts, setToasts] = useState<string[]>([])
  const addToast = (message: string) => {
    setToasts([...toasts, message])
  }
  const removeToast = (index: number) => {
    const newToasts = [...toasts]
    newToasts.splice(index, 1)
    setToasts(newToasts)
  }

  useEffect(() => {
    if (userStatus) {
      addToast(userStatus)
    }
  }, [userStatus])

  return <div className='toast-container'>
    {toasts.map((message, index) => (
      <Toast key={index} message={message} onClose={() => removeToast(index)} />
    ))}
  </div>
}

export default ToastContainer