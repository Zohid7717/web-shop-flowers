import { FC, useEffect, useState } from 'react'
import './Discount.scss'
import { useAppDispatch, useAppSelector } from '../../../service/redux/hooks/hooks'
import { getDiscounts } from '../../../service/redux/Slices/discount/slice'

const Discount: FC = () => {
  const discountList = useAppSelector(state => state.discount.list)
  const [max, setMax] = useState(0)
  const [med, setMed] = useState(0)
  const [min, setMin] = useState(0)
  
  const [maxSize, setMaxSize] = useState(0)
  const [medSize, setMedSize] = useState(0)
  const [minSize, setMinSize] = useState(0)

  const handlerSize = (a, b) => {
    
  }
  
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getDiscounts())
    setMax(discountList[2].total)
    setMed(discountList[1].total)
    setMin(discountList[0].total)
  }, [])
  console.log(max, med, min)
  return <div className='discount'>
    <h2>Ваша скидка - 3%</h2>
    <div className="discount__bar">
      <div className="discount__bar-body">
        <div className="discount__moving-point"></div>
        <div className="discount__border-min border">
          <p className="discount__border-text">от 1 0000 руб.</p>
          <p className="discount__border-percent">3%</p>
        </div>
        <div className="discount__border-med border" style={{left: min}}>
          <p className="discount__border-text">от 50000 руб.</p>
          <p className="discount__border-percent">5%</p>
        </div>
        <div className="discount__border-max border">
          <p className="discount__border-text">от 90000 руб.</p>
          <p className="discount__border-percent">7%</p>
        </div>
      </div>
      <p>СУММА ЗАКАЗОВ:</p>
    </div>
    <div className="total-orders">Сумма заказов - <span className='green'>15 000 руб.</span></div>
  </div>
}

export default Discount